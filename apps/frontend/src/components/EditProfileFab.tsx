import Link from "next/link";

export default function EditProfileFab() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-5 py-2.5 bg-[#121214]/80 backdrop-blur-md border border-border rounded-full shadow-2xl text-sm font-medium text-text-primary hover:bg-white hover:text-black hover:border-white transition-all group cursor-pointer"
      >
        <svg
          className="w-4 h-4 text-text-secondary group-hover:text-black transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        Edit Profile
      </Link>
    </div>
  );
}
