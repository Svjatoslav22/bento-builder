"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const inputClass = "w-full rounded-lg border border-border bg-[#1A1A1D] px-3 py-2.5 text-sm text-text-primary outline-none transition focus:border-gray-500";

export default function OnboardingForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/profile", {
      method: "POST",
      body: new FormData(event.currentTarget),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Could not save your profile");
      setSaving(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5">
      <label className="block text-xs font-medium text-text-secondary">Username<input name="username" required pattern="[a-zA-Z0-9_]{3,30}" placeholder="alexdev" className={`${inputClass} mt-1.5`} /></label>
      <label className="block text-xs font-medium text-text-secondary">Name<input name="name" required placeholder="Alex Designer" className={`${inputClass} mt-1.5`} /></label>
      <label className="block text-xs font-medium text-text-secondary">Title / Role<input name="title" placeholder="Senior UI/UX Developer" className={`${inputClass} mt-1.5`} /></label>
      <label className="block text-xs font-medium text-text-secondary">Bio<textarea name="bio" rows={4} placeholder="Tell people what you build..." className={`${inputClass} mt-1.5 resize-none`} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-xs font-medium text-text-secondary">Avatar upload<input name="avatar" type="file" accept="image/*" className="mt-2 block w-full text-xs text-text-secondary" /></label>
        <label className="block text-xs font-medium text-text-secondary">Resume upload<input name="resume" type="file" accept="application/pdf" className="mt-2 block w-full text-xs text-text-secondary" /></label>
      </div>
      <label className="block text-xs font-medium text-text-secondary">LinkedIn URL<input name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/alexdev" className={`${inputClass} mt-1.5`} /></label>
      <label className="block text-xs font-medium text-text-secondary">GitHub URL<input name="githubUrl" type="url" placeholder="https://github.com/alexdev" className={`${inputClass} mt-1.5`} /></label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={saving} type="submit" className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-wait disabled:opacity-60">{saving ? "Saving..." : "Complete Profile"}</button>
    </form>
  );
}