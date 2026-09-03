"use client";

import { useEffect, useState } from "react";

type LocationWidgetProps = {
  className?: string;
  city?: string;
  timezone?: string;
  isEditing?: boolean;
};

export default function LocationWidget({ className = "", city = "Kyiv, UA", timezone = "Europe/Kyiv" }: LocationWidgetProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(formatTime(timezone));
    updateTime();
    const interval = window.setInterval(updateTime, 60000);
    return () => window.clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className={`bento-card col-span-1 row-span-1 bg-surface border border-border rounded-[24px] p-5 flex flex-col justify-center items-center text-center ${className}`}
    >
      <svg
        className="w-7 h-7 text-text-secondary mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-text-primary font-medium text-sm">{city}</p>
      <p className="text-text-secondary text-xs mt-1 font-mono">{time}</p>
    </div>
  );
}

function formatTime(timezone: string) {
  return new Date().toLocaleTimeString("en-US", { timeZone: timezone, hour: "2-digit", minute: "2-digit" });
}
