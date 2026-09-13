import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const UNSPECIFIED = "Не вказано";

function getChatModel() {
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  if (openRouterKey) {
    return createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: openRouterKey,
    })("meta-llama/llama-3.1-8b-instruct");
  }

  const geminiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY
  )?.trim();

  if (geminiKey) {
    return createOpenAI({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: geminiKey,
    })("gemini-2.0-flash");
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const model = getChatModel();
    if (!model) {
      return Response.json(
        { error: "AI is not configured. Set OPENROUTER_API_KEY or GEMINI_API_KEY." },
        { status: 400 },
      );
    }

    let payload: {
      messages?: CoreMessage[];
      widgetId?: string;
      name?: string;
      bio?: string;
      technologies?: string | string[];
    };
    try {
      payload = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { messages, widgetId } = payload;
    if (!widgetId || typeof widgetId !== "string") {
      return Response.json({ error: "widgetId is required" }, { status: 400 });
    }
    if (!Array.isArray(messages)) {
      return Response.json({ error: "messages are required" }, { status: 400 });
    }

    let profileName = "";
    let profileBio = "";
    let profileStack = "";
    try {
      const widget = await prisma.widget.findUnique({
        where: { id: widgetId },
        include: { profile: { include: { widgets: true } } },
      });
      if (!widget) {
        return Response.json({ error: "Widget not found" }, { status: 404 });
      }
      profileName = widget.profile.name?.trim() || "";
      profileBio = widget.profile.bio?.trim() || "";
      profileStack = technologiesFromWidgets(widget.profile.widgets);
    } catch (error) {
      return jsonError(error, "Failed to load chat widget");
    }

    const name = textOrUnspecified(payload.name) !== UNSPECIFIED ? textOrUnspecified(payload.name) : textOrUnspecified(profileName);
    const bio = textOrUnspecified(payload.bio) !== UNSPECIFIED ? textOrUnspecified(payload.bio) : textOrUnspecified(profileBio);
    const technologies =
      serializeTechnologies(payload.technologies) !== UNSPECIFIED
        ? serializeTechnologies(payload.technologies)
        : textOrUnspecified(profileStack);

    const systemPrompt = `Ти — AI-асистент, який представляє розробника на ім'я ${name}. Твоя мета — відповідати на запитання про його досвід. Його технології: ${technologies}. Його біографія: ${bio}. КРИТИЧНЕ ПРАВИЛО: Відповідай ТІЛЬКИ на основі цих даних. Якщо користувач запитує про навички, досвід чи особисту інформацію, якої немає в цих змінних, ти ЗОБОВ'ЯЗАНИЙ відповісти: 'Користувач не надав такої інформації' (або 'Я не маю інформації про це'). Ніколи нічого не вигадуй.`;

    try {
      const result = await streamText({
        model,
        system: systemPrompt,
        messages,
        abortSignal: AbortSignal.timeout(45_000),
      });

      return result.toDataStreamResponse({
        getErrorMessage: (error) =>
          error instanceof Error ? error.message : "The model stopped streaming unexpectedly.",
      });
    } catch (error) {
      return jsonError(error, "OpenRouter request failed");
    }
  } catch (error) {
    return jsonError(error, "Chat request failed");
  }
}

function textOrUnspecified(value: unknown): string {
  if (typeof value !== "string") return UNSPECIFIED;
  const text = value.trim();
  if (!text || text === UNSPECIFIED) return UNSPECIFIED;
  return text;
}

function serializeTechnologies(value: unknown): string {
  if (Array.isArray(value)) {
    const items = value.map((item) => String(item).trim()).filter(Boolean);
    return items.length ? items.join(", ") : UNSPECIFIED;
  }
  return textOrUnspecified(value);
}

function technologiesFromWidgets(widgets: { type: string; config: unknown }[]): string {
  const techWidget = widgets.find((widget) => widget.type === "tech-stack");
  const config = techWidget?.config;
  if (!config || typeof config !== "object" || Array.isArray(config)) return "";
  return serializeTechnologies((config as Record<string, unknown>).technologies);
}

function jsonError(error: unknown, fallback: string) {
  const errorMessage = error instanceof Error && error.message.trim() ? error.message : fallback;
  const status = statusFromError(error);
  console.error("Chat API error:", errorMessage);
  return Response.json({ error: errorMessage }, { status });
}

function statusFromError(error: unknown): number {
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status: unknown }).status)
      : Number.NaN;
  const message = error instanceof Error ? error.message : String(error ?? "");

  if (status === 429 || /rate limit/i.test(message)) return 429;
  if (status === 408 || /timeout|timed out|abort/i.test(message)) return 408;
  if (status >= 400 && status < 500) return status;
  if (status >= 500 && status < 600) return 502;
  return 502;
}
