"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, FileText, ImagePlus, LoaderCircle, X } from "lucide-react";
import CropModal from "@/components/CropModal";
import { LanguageSwitcher, useLandingLanguage } from "@/components/LandingLanguage";

const usernamePattern = /^[a-zA-Z0-9_]{3,30}$/;
const resumeMaxBytes = 5 * 1024 * 1024;

type UsernameStatus = "idle" | "checking" | "available" | "taken" | "error";
type FieldErrors = { username: "" | "required" | "invalid" | "taken"; name: "" | "required" };

const inputClass = "h-12 w-full rounded-xl border border-[#26262c] bg-[#0f0f12] px-4 text-sm text-white outline-none transition placeholder:text-[#656570] focus:border-[#6D5BFF] focus:ring-2 focus:ring-[#6D5BFF]/30";
const helperClass = "mt-1.5 text-xs leading-5 text-[#858590]";

function GithubMark({ className }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" /></svg>;
}

function LinkedInMark({ className }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.33V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.36-1.86 3.59 0 4.25 2.36 4.25 5.43v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>;
}

export default function OnboardingForm() {
  const router = useRouter();
  const { lang, t } = useLandingLanguage();
  const copy = t.onboarding;
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({ username: "", name: "" });
  const [touched, setTouched] = useState({ username: false, name: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ username: "", name: "", title: "", bio: "", linkedinUrl: "", githubUrl: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [hasAvatarError, setHasAvatarError] = useState(false);
  const [resumeError, setResumeError] = useState<"" | "type" | "size">("");
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState<{ value: string; status: UsernameStatus }>({ value: "", status: "idle" });
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const normalizedUsername = form.username.trim().toLowerCase();
  const usernameIsValid = usernamePattern.test(normalizedUsername);
  const usernameStatus: UsernameStatus = !usernameIsValid
    ? "idle"
    : usernameCheck.value === normalizedUsername
      ? usernameCheck.status
      : "checking";

  useEffect(() => {
    if (!usernamePattern.test(normalizedUsername)) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setUsernameCheck({ value: normalizedUsername, status: "checking" });
      try {
        const response = await fetch(`/api/profile/${encodeURIComponent(normalizedUsername)}`, {
          signal: controller.signal,
        });
        setUsernameCheck({
          value: normalizedUsername,
          status: response.status === 404 ? "available" : response.ok ? "taken" : "error",
        });
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setUsernameCheck({ value: normalizedUsername, status: "error" });
      }
    }, 350);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [normalizedUsername]);

  const initials = useMemo(() => {
    const source = form.name.trim() || form.username.trim();
    const letters = source.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]);
    return (letters.join("") || "BB").toUpperCase();
  }, [form.name, form.username]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setHasSubmitError(false);
    if (field === "username" || field === "name") {
      setFieldErrors((current) => ({ ...current, [field]: "" }));
    }
  }

  function validateUsername() {
    setTouched((current) => ({ ...current, username: true }));
    if (!normalizedUsername) setFieldErrors((current) => ({ ...current, username: "required" }));
    else if (!usernameIsValid) setFieldErrors((current) => ({ ...current, username: "invalid" }));
  }

  function validateName() {
    setTouched((current) => ({ ...current, name: true }));
    if (!form.name.trim()) setFieldErrors((current) => ({ ...current, name: "required" }));
  }

  function chooseAvatar(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setHasAvatarError(true);
      return;
    }
    setHasAvatarError(false);
    setCropImage(URL.createObjectURL(file));
  }

  function chooseResume(file?: File) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setResumeFile(null);
      setResumeError("type");
      return;
    }
    if (file.size > resumeMaxBytes) {
      setResumeFile(null);
      setResumeError("size");
      return;
    }
    setResumeFile(file);
    setResumeError("");
  }

  function cancelCrop() {
    if (cropImage) URL.revokeObjectURL(cropImage);
    setCropImage("");
  }

  function saveCrop(cropped: string) {
    setAvatarPreview(cropped);
    cancelCrop();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {
      username: !normalizedUsername
        ? "required"
        : !usernameIsValid
          ? "invalid"
          : usernameStatus === "taken"
            ? "taken"
            : "",
      name: form.name.trim() ? "" : "required",
    };
    setFieldErrors(nextErrors);
    setTouched({ username: true, name: true });
    if (nextErrors.username || nextErrors.name || usernameStatus === "checking" || hasAvatarError || resumeError) return;

    setIsSubmitting(true);
    setHasSubmitError(false);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          avatarUrl: avatarPreview || null,
          resumeUrl: resumeFile ? resumeFile.name : null,
          defaultWidgets: [
            { type: "profile", sizePreset: "L", config: {} },
            { type: "spotify", sizePreset: "M", config: {} },
            { type: "portfolio", sizePreset: "M", config: {} },
            { type: "location", sizePreset: "S", config: { city: "Kyiv, UA", timezone: "Europe/Kyiv" } },
            { type: "resume", sizePreset: "S", config: {} },
            { type: "ai-chat", sizePreset: "M", config: {} },
          ],
        }),
      });
      if (!response.ok) {
        if (response.status === 409) setFieldErrors((current) => ({ ...current, username: "taken" }));
        else setHasSubmitError(true);
        setIsSubmitting(false);
        return;
      }
      router.push("/dashboard");
    } catch {
      setHasSubmitError(true);
      setIsSubmitting(false);
    }
  }

  const formIsValid = Boolean(
    usernameIsValid &&
      form.name.trim() &&
      usernameStatus !== "checking" &&
      usernameStatus !== "taken" &&
      !fieldErrors.username &&
      !fieldErrors.name &&
      !hasAvatarError &&
      !resumeError &&
      !isSubmitting,
  );

  const usernameMessage = (fieldErrors.username === "required" ? copy.usernameRequired
    : fieldErrors.username === "invalid" ? copy.usernameInvalid
      : fieldErrors.username === "taken" ? copy.usernameTaken : "") || (
    touched.username && !normalizedUsername ? copy.usernameRequired :
    normalizedUsername && !usernameIsValid ? copy.usernameInvalid : ""
  );
  const nameMessage = fieldErrors.name === "required" || (touched.name && !form.name.trim()) ? copy.nameRequired : "";
  const resumeSize = resumeFile
    ? `${(resumeFile.size / (1024 * 1024)).toLocaleString(lang, { maximumFractionDigits: 2 })} ${copy.megabytes}`
    : "";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#0a0a0a] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-56 -z-10 h-[36rem] w-[36rem] rounded-full bg-[#6D5BFF]/25 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-7 flex flex-wrap items-center justify-between gap-5 sm:mb-9">
          <Image src="/logo.svg" width={167} height={32} alt="Bento Builder" className="h-8 w-auto" />
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-36 sm:w-48" aria-label={copy.stepLabel}>
              <div className="mb-2 text-right text-xs font-medium text-[#9A9AA5]">{copy.step}</div>
              <div
                role="progressbar"
                aria-label={copy.stepLabel}
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={2}
                className="h-1 overflow-hidden rounded-full bg-[#26262c]"
              >
                <div className="h-full w-2/3 rounded-full bg-[#6D5BFF]" />
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-7">
          <section className="rounded-3xl border border-[#26262c] bg-[#111114] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-8">
            <div className="mb-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a99fff]">{copy.eyebrow}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[38px] sm:leading-[1.1]">{copy.title}</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#9A9AA5]">{copy.subtitle}</p>
            </div>

            <form onSubmit={submit} className="space-y-7">
              <section aria-labelledby="about-section-title" className="space-y-4">
                <h2 id="about-section-title" className="border-b border-[#26262c] pb-3 text-sm font-semibold text-white">{copy.about}</h2>

                <div>
                  <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-[#e7e7eb]">
                    {copy.username} <span className="text-[#9A9AA5]">*</span>
                  </label>
                  <div className={`flex h-12 overflow-hidden rounded-xl border bg-[#0f0f12] transition focus-within:ring-2 ${usernameMessage ? "border-red-400/70 focus-within:border-red-400 focus-within:ring-red-400/20" : "border-[#26262c] focus-within:border-[#6D5BFF] focus-within:ring-[#6D5BFF]/30"}`}>
                    <span aria-hidden="true" className="flex shrink-0 items-center border-r border-[#26262c] px-3 text-xs text-[#777782] sm:px-4 sm:text-sm">bento-builder-frontend.vercel.app/</span>
                    <input
                      id="username"
                      name="username"
                      value={form.username}
                      onChange={(event) => updateField("username", event.target.value)}
                      onBlur={validateUsername}
                      required
                      minLength={3}
                      maxLength={30}
                      pattern="[a-zA-Z0-9_]{3,30}"
                      autoComplete="username"
                      aria-invalid={Boolean(usernameMessage || usernameStatus === "taken")}
                      aria-describedby="username-helper username-status username-error"
                      placeholder="yourname"
                      className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#656570]"
                    />
                    {usernameStatus === "available" && <span className="flex items-center gap-1.5 pr-3 text-xs font-medium text-emerald-400 sm:pr-4"><Check size={15} aria-hidden="true" />{copy.usernameAvailable}</span>}
                    {usernameStatus === "taken" && <span className="flex items-center gap-1.5 pr-3 text-xs font-medium text-red-400 sm:pr-4"><X size={15} aria-hidden="true" />{copy.usernameTaken}</span>}
                    {usernameStatus === "checking" && <LoaderCircle size={16} aria-label={copy.usernameChecking} className="mr-4 animate-spin text-[#9A9AA5]" />}
                  </div>
                  <p id="username-helper" className={helperClass}>{copy.usernameHelper}</p>
                    {usernameStatus === "error" && <p id="username-status" className={helperClass}>{copy.usernameCheckFailed}</p>}
                  {usernameMessage && <p id="username-error" className="mt-1.5 text-xs leading-5 text-red-400">{usernameMessage}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#e7e7eb]">{copy.name} <span className="text-[#9A9AA5]">*</span></label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      onBlur={validateName}
                      required
                      autoComplete="name"
                      aria-invalid={Boolean(nameMessage)}
                      aria-describedby="name-helper name-error"
                      placeholder={copy.previewName}
                      className={`${inputClass} ${nameMessage ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                    />
                    <p id="name-helper" className={helperClass}>{copy.nameHelper}</p>
                    {nameMessage && <p id="name-error" className="mt-1.5 text-xs leading-5 text-red-400">{nameMessage}</p>}
                  </div>
                  <div>
                    <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-[#e7e7eb]">{copy.role}</label>
                    <input id="title" name="title" value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder={copy.rolePlaceholder} className={inputClass} />
                    <p className={helperClass}>{copy.roleHelper}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-4">
                    <label htmlFor="bio" className="text-sm font-medium text-[#e7e7eb]">{copy.bio}</label>
                    <span className="text-xs tabular-nums text-[#777782]">{form.bio.length}/200</span>
                  </div>
                  <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={(event) => updateField("bio", event.target.value)}
                    rows={3}
                    maxLength={200}
                    placeholder={copy.bioPlaceholder}
                    className="w-full resize-y rounded-xl border border-[#26262c] bg-[#0f0f12] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-[#656570] focus:border-[#6D5BFF] focus:ring-2 focus:ring-[#6D5BFF]/30"
                  />
                  <p className={helperClass}>{copy.bioHelper}</p>
                </div>
              </section>

              <section aria-labelledby="files-section-title" className="space-y-4">
                <h2 id="files-section-title" className="border-b border-[#26262c] pb-3 text-sm font-semibold text-white">{copy.files}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-sm font-medium text-[#e7e7eb]">{copy.avatar}</p>
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      onDragOver={(event) => { event.preventDefault(); setIsDraggingAvatar(true); }}
                      onDragLeave={() => setIsDraggingAvatar(false)}
                      onDrop={(event) => { event.preventDefault(); setIsDraggingAvatar(false); chooseAvatar(event.dataTransfer.files?.[0]); }}
                      aria-label={copy.avatarChoose}
                      className={`flex h-44 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-4 text-center transition ${isDraggingAvatar ? "border-[#8E7FFF] bg-[#6D5BFF]/10" : "border-[#35353e] bg-[#0f0f12] hover:border-[#6D5BFF]/70 hover:bg-[#15141b]"}`}
                    >
                      {avatarPreview
                        ? <Image src={avatarPreview} alt={copy.avatar} width={64} height={64} unoptimized className="h-16 w-16 rounded-full border border-white/10 object-cover" />
                        : <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#6D5BFF]/35 bg-[#211d38] text-lg font-semibold text-[#c1baff]">{initials}</span>}
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-white"><ImagePlus size={16} aria-hidden="true" />{isDraggingAvatar ? copy.avatarDrop : copy.avatarChoose}</span>
                      <span className="text-xs text-[#858590]">{copy.avatarHelper}</span>
                    </button>
                    <input
                      ref={avatarInputRef}
                      name="avatar"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => { chooseAvatar(event.target.files?.[0]); event.target.value = ""; }}
                    />
                    {hasAvatarError && <p className="mt-1.5 text-xs text-red-400">{copy.avatarError}</p>}
                  </div>

                  <div>
                    <p className="mb-1.5 text-sm font-medium text-[#e7e7eb]">{copy.resume}</p>
                    <button
                      type="button"
                      onClick={() => resumeInputRef.current?.click()}
                      onDragOver={(event) => { event.preventDefault(); setIsDraggingResume(true); }}
                      onDragLeave={() => setIsDraggingResume(false)}
                      onDrop={(event) => { event.preventDefault(); setIsDraggingResume(false); chooseResume(event.dataTransfer.files?.[0]); }}
                      aria-label={copy.resumeChoose}
                      className={`flex h-44 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-4 text-center transition ${isDraggingResume ? "border-[#8E7FFF] bg-[#6D5BFF]/10" : "border-[#35353e] bg-[#0f0f12] hover:border-[#6D5BFF]/70 hover:bg-[#15141b]"}`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#30303a] bg-[#17171c] text-[#aaa1ff]"><FileText size={21} aria-hidden="true" /></span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-white">{isDraggingResume ? copy.resumeDrop : resumeFile ? resumeFile.name : copy.resumeChoose}</span>
                      <span className="text-xs text-[#858590]">{resumeFile ? resumeSize : copy.resumeHelper}</span>
                    </button>
                    <input
                      ref={resumeInputRef}
                      name="resume"
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      onChange={(event) => { chooseResume(event.target.files?.[0]); event.target.value = ""; }}
                    />
                    {resumeError && <p className="mt-1.5 text-xs text-red-400">{resumeError === "type" ? copy.resumeErrorType : copy.resumeErrorSize}</p>}
                  </div>
                </div>
              </section>

              <section aria-labelledby="links-section-title" className="space-y-4">
                <h2 id="links-section-title" className="border-b border-[#26262c] pb-3 text-sm font-semibold text-white">{copy.links}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="linkedinUrl" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#e7e7eb]">{copy.linkedin}<span className="text-xs font-normal text-[#777782]">{copy.optional}</span></label>
                    <div className="relative">
                      <LinkedInMark className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777782]" />
                      <input id="linkedinUrl" name="linkedinUrl" value={form.linkedinUrl} onChange={(event) => updateField("linkedinUrl", event.target.value)} type="url" placeholder={copy.linkedinPlaceholder} className={`${inputClass} pl-11`} />
                    </div>
                    <p className={helperClass}>{copy.linkedinHelper}</p>
                  </div>
                  <div>
                    <label htmlFor="githubUrl" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#e7e7eb]">{copy.github}<span className="text-xs font-normal text-[#777782]">{copy.optional}</span></label>
                    <div className="relative">
                      <GithubMark className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777782]" />
                      <input id="githubUrl" name="githubUrl" value={form.githubUrl} onChange={(event) => updateField("githubUrl", event.target.value)} type="url" placeholder={copy.githubPlaceholder} className={`${inputClass} pl-11`} />
                    </div>
                    <p className={helperClass}>{copy.githubHelper}</p>
                  </div>
                </div>
              </section>

              {hasSubmitError && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">{copy.submitError}</p>}
              <button
                disabled={!formIsValid}
                type="submit"
                className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#6D5BFF] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(109,91,255,0.2)] transition hover:bg-[#7b6aff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a99fff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114] disabled:cursor-not-allowed disabled:bg-[#38334f] disabled:text-white/55 disabled:shadow-none"
              >
                {isSubmitting ? <LoaderCircle size={17} className="animate-spin" aria-hidden="true" /> : <>{copy.submit}<ArrowRight size={17} aria-hidden="true" /></>}
                <span className="sr-only">{isSubmitting ? copy.submitting : ""}</span>
              </button>
            </form>
          </section>

          <aside className="rounded-3xl border border-[#26262c] bg-[#111114]/90 p-5 sm:p-7 lg:sticky lg:top-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold text-white">{copy.previewTitle}</h2>
              <span className="rounded-full border border-[#322c57] bg-[#1a1728] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.13em] text-[#aaa1ff]">Bento</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 flex min-h-56 flex-col justify-between rounded-2xl border border-[#292832] bg-[#0d0d10] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  {avatarPreview
                    ? <Image src={avatarPreview} alt="" width={64} height={64} unoptimized className="h-16 w-16 rounded-2xl border border-white/10 object-cover" />
                    : <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#6D5BFF]/35 bg-[#211d38] text-lg font-semibold text-[#c1baff]">{initials}</span>}
                  <div className="flex gap-2 text-[#858590]" aria-label={copy.previewSocials}>
                    <span className={`rounded-lg border border-[#292832] p-2 ${form.linkedinUrl ? "text-[#c7c2ff]" : ""}`}><LinkedInMark className="h-[15px] w-[15px]" /></span>
                    <span className={`rounded-lg border border-[#292832] p-2 ${form.githubUrl ? "text-[#c7c2ff]" : ""}`}><GithubMark className="h-[15px] w-[15px]" /></span>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="truncate text-xl font-semibold tracking-tight text-white">{form.name.trim() || copy.previewName}</p>
                  <p className="mt-1 truncate text-sm text-[#b8b8c2]">{form.title.trim() || copy.previewRole}</p>
                  <p className="mt-3 line-clamp-3 min-h-[3rem] text-sm leading-6 text-[#858590]">{form.bio.trim() || copy.previewBio}</p>
                </div>
              </div>

              <div className="col-span-2 flex min-h-24 items-center gap-3 rounded-2xl border border-[#292832] bg-[#0d0d10] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#292832] bg-[#17171c] text-[#aaa1ff]"><FileText size={18} aria-hidden="true" /></span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.13em] text-[#858590]">{copy.previewResume}</p>
                  <p className="mt-1 truncate text-sm text-white">{resumeFile?.name || copy.previewResumeEmpty}</p>
                  {resumeFile && <p className="mt-0.5 text-xs text-[#858590]">{resumeSize}</p>}
                </div>
              </div>
              <div className="col-span-2 rounded-2xl border border-[#292832] bg-[#0d0d10] px-4 py-3">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.13em] text-[#777782]">{copy.previewSocials}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-lg border border-[#292832] px-2.5 py-1.5 text-xs ${form.linkedinUrl ? "text-white" : "text-[#777782]"}`}><LinkedInMark className="h-[13px] w-[13px]" />{copy.linkedin}</span>
                  <span className={`inline-flex items-center gap-1.5 rounded-lg border border-[#292832] px-2.5 py-1.5 text-xs ${form.githubUrl ? "text-white" : "text-[#777782]"}`}><GithubMark className="h-[13px] w-[13px]" />{copy.github}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {cropImage && <CropModal image={cropImage} onCancel={cancelCrop} onSave={saveCrop} />}
    </main>
  );
}
