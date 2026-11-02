export const WIDGET_ALLOWED_SIZES: Record<string, string[]> = {
  profile: ["L", "Wide"],
  "ai-chat": ["M", "L", "Wide"],
  "github-stats": ["S", "M", "Wide"],
  "tech-stack": ["M", "L", "Wide"],
  spotify: ["M", "Wide"],
  radio: ["M", "Wide"],
  location: ["S", "M", "L", "Wide"],
  resume: ["S", "M", "L", "Wide"],
  portfolio: ["M", "Wide"],
};

export const DEFAULT_WIDGET_SIZES: Record<string, string> = {
  profile: "L",
  "ai-chat": "M",
  "github-stats": "M",
  "tech-stack": "M",
  spotify: "M",
  radio: "M",
  location: "S",
  resume: "S",
  portfolio: "M",
};

export function getWidgetAllowedSizes(type: string): string[] {
  return WIDGET_ALLOWED_SIZES[type] || ["S", "M", "L", "Wide"];
}

export function getValidWidgetSize(type: string, size?: string | null): string {
  const allowed = getWidgetAllowedSizes(type);
  if (size && allowed.includes(size)) {
    return size;
  }
  const defaultSize = DEFAULT_WIDGET_SIZES[type];
  if (defaultSize && allowed.includes(defaultSize)) {
    return defaultSize;
  }
  return allowed[0] || "M";
}

