"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CropModal from "@/components/CropModal";

const inputClass = "w-full rounded-lg border border-border bg-[#1A1A1D] px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-gray-500";

export default function OnboardingForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ username: "", name: "" });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ username: "", name: "", title: "", bio: "", linkedinUrl: "", githubUrl: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [cropImage, setCropImage] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === "username" || field === "name") {
      setFieldErrors((current) => ({ ...current, [field]: "" }));
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      username: form.username.trim() ? "" : "Username is required",
      name: form.name.trim() ? "" : "Name is required",
    };
    setFieldErrors(nextErrors);
    if (nextErrors.username || nextErrors.name) return;
    setSaving(true);
    setError("");
    console.log("submit profile", { ...form, avatar: avatarFile, resume: resumeFile });
    router.push("/dashboard");
  }

  return (
    <>
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block text-xs font-medium text-text-secondary">Username<input name="username" value={form.username} onChange={(event) => updateField("username", event.target.value)} required pattern="[a-zA-Z0-9_]{3,30}" placeholder="yourname" className={`${inputClass} mt-1.5`} />{fieldErrors.username && <span className="mt-1 block text-xs text-red-400">{fieldErrors.username}</span>}</label>
      <label className="block text-xs font-medium text-text-secondary">Name<input name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required placeholder="Your full name" className={`${inputClass} mt-1.5`} />{fieldErrors.name && <span className="mt-1 block text-xs text-red-400">{fieldErrors.name}</span>}</label>
      <label className="block text-xs font-medium text-text-secondary">Title / Role<input name="title" value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="e.g. Full-Stack Developer" className={`${inputClass} mt-1.5`} /></label>
      <label className="block text-xs font-medium text-text-secondary">Bio<textarea name="bio" value={form.bio} onChange={(event) => updateField("bio", event.target.value)} rows={4} placeholder="Tell people what you build..." className={`${inputClass} mt-1.5 resize-none`} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="text-xs font-medium text-text-secondary"><span>Avatar upload</span><div className="mt-2 flex items-center gap-3"><div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-[#1A1A1D]">{avatarPreview && <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />}</div><input ref={avatarInputRef} name="avatar" type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setCropImage(URL.createObjectURL(file)); }} /><button type="button" onClick={() => avatarInputRef.current?.click()} className={`${inputClass} w-auto`}>↑ Choose file</button></div>{avatarFile && <span className="mt-1 block truncate text-xs font-normal text-text-secondary">{avatarFile.name}</span>}</div>
        <div className="text-xs font-medium text-text-secondary"><span>Resume upload</span><input ref={resumeInputRef} name="resume" type="file" accept="application/pdf" className="hidden" onChange={(event) => setResumeFile(event.target.files?.[0] || null)} /><div className="mt-2 flex items-center gap-3"><button type="button" onClick={() => resumeInputRef.current?.click()} className={`${inputClass} w-auto`}>↑ Choose file</button>{resumeFile && <span className="truncate text-xs font-normal text-text-secondary">{resumeFile.name}</span>}</div></div>
      </div>
      <label className="block text-xs font-medium text-text-secondary">LinkedIn URL<input name="linkedinUrl" value={form.linkedinUrl} onChange={(event) => updateField("linkedinUrl", event.target.value)} type="url" placeholder="https://linkedin.com/in/yourname" className={`${inputClass} mt-1.5`} /></label>
      <label className="block text-xs font-medium text-text-secondary">GitHub URL<input name="githubUrl" value={form.githubUrl} onChange={(event) => updateField("githubUrl", event.target.value)} type="url" placeholder="https://github.com/yourname" className={`${inputClass} mt-1.5`} /></label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={saving} type="submit" className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-wait disabled:opacity-60">{saving ? "Saving..." : "Complete Profile"}</button>
    </form>
    {cropImage && <CropModal image={cropImage} onCancel={() => setCropImage("")} onSave={(cropped) => { setAvatarPreview(cropped); setAvatarFile(null); setCropImage(""); }} />}
    </>
  );
}