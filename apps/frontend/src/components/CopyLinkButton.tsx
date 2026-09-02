"use client";

import { useState } from "react";

export default function CopyLinkButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button type="button" onClick={copy} className="border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-text-primary transition hover:border-border-hover">
      {copied ? "Copied" : "Copy"}
    </button>
  );
}