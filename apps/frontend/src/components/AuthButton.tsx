"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg">Привіт, {session.user?.name} 👋</p>
        <button 
          onClick={() => signOut()} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Вийти
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn("github")} 
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
    >
      Увійти через GitHub
    </button>
  );
}
