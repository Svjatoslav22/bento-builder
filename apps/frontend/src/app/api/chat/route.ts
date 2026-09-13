import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
        { status: 503 },
      );
    }

    let payload: { messages?: CoreMessage[]; widgetId?: string };
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

    const widget = await prisma.widget.findUnique({
      where: { id: widgetId },
      include: {
        profile: {
          include: {
            user: true,
            widgets: true,
          },
        },
      },
    });

    if (!widget) {
      return new Response("Widget not found", { status: 404 });
    }

    const profile = widget.profile;
    const widgetConfig = isRecord(widget.config) ? widget.config : {};
    const widgetContext = typeof widgetConfig.context === "string" ? widgetConfig.context.trim() : "";
    const techStack = readTechStack(profile.widgets);
    const userName = profile.user?.name?.trim() || profile.name?.trim() || "User";
    const title = profile.title?.trim() || "not specified";
    const bio = profile.bio?.trim() || "not specified";
    const stackLine = techStack.length
      ? techStack.join(", ")
      : "none listed — do not infer or invent any languages, frameworks, or tools";

    const systemPrompt = `Ти цифровий асистент (AI-клон) розробника.
Ім'я користувача (user.name): ${userName}.
Посада з профілю: ${title}.
Біо з профілю: ${bio}.
Реальний Tech Stack з віджета: ${stackLine}.
Додатковий контекст віджета AI Chat: ${widgetContext || "немає"}.

Правила:
- Спирайся ВИКЛЮЧНО на ці дані профілю, ім'я користувача та реальний стек.
- ЗАБОРОНЕНО вигадувати навички, мови чи інструменти, яких немає у Tech Stack (наприклад Python чи Java, якщо їх там немає).
- Якщо стек порожній або навичку не зазначено — чесно скажи, що цієї інформації немає в профілі.
- Відповідай коротко і професійно.`;

    const result = await streamText({
      model,
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Chat is temporarily unavailable" }, { status: 503 });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readTechStack(widgets: { type: string; config: unknown }[]): string[] {
  const techWidget = widgets.find((item) => item.type === "tech-stack");
  if (!techWidget || !isRecord(techWidget.config)) return [];

  const value = techWidget.config.technologies;
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(/[,|\n]+/).map((item) => item.trim()).filter(Boolean);
  }
  return [];
}
