"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="fixed right-4 top-4 z-50 border border-border bg-surface/90 px-3 py-2 text-xs font-medium text-text-secondary backdrop-blur-md transition hover:border-border-hover hover:text-text-primary"
    >
      Logout
    </button>
  );
}