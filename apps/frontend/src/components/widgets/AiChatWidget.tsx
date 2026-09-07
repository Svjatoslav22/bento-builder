"use client";

import { useChat, type Message } from "ai/react";

type AiChatWidgetProps = {
  className?: string;
  isEditing?: boolean;
  widget?: { id?: string };
};

export default function AiChatWidget({ className = "", isEditing = false, widget }: AiChatWidgetProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { widgetId: widget?.id || "" },
  });

  return (
    <div
      className={`bento-card col-span-2 row-span-1 bg-surface border border-border rounded-[24px] p-4 flex flex-col justify-between ${className}`}
    >
      <div className="flex-1 overflow-hidden px-2 pt-1 space-y-3">
        {messages.length === 0 && (
          <div className="flex gap-3 items-start opacity-70">
            <div className="w-6 h-6 rounded-full bg-border flex-shrink-0 flex items-center justify-center text-[10px]">
              AI
            </div>
            <p className="text-sm text-text-secondary font-mono">
              Hi! I&apos;m Alex&apos;s AI clone. Ask me about his tech stack or recent projects.
            </p>
          </div>
        )}
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex gap-3 items-start ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-border flex-shrink-0 flex items-center justify-center text-[10px]">
              {message.role === "user" ? "You" : "AI"}
            </div>
            <div
              className={`text-sm text-text-secondary font-mono max-w-[80%] ${
                message.role === "user"
                  ? "bg-white/10 rounded-xl py-2 px-3"
                  : ""
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-border flex-shrink-0 flex items-center justify-center text-[10px]">
              AI
            </div>
            <p className="text-sm text-text-secondary font-mono italic">
              Thinking...
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 relative">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={isEditing ? "Chat disabled in edit mode" : "Ask my AI anything..."}
          className="w-full bg-[#1A1A1D] border border-border rounded-xl py-3 px-4 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-gray-500 transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isEditing || isLoading}
        />
        <button
          type="submit"
          disabled={isEditing || isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
