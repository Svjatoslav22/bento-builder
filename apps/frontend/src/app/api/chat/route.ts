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
    });

    if (!widget) {
      return new Response("Widget not found", { status: 404 });
    }

    const systemPrompt = "Ти — AI-клон розробника. Твоя мета — відповідати тільки на основі реального стеку та проєктів користувача. Ніколи не придумуй навички. Якщо запитують про Python, Java, C++, відповідай, що ти з цим не працюєш. Твій ключовий стек: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express.js, NestJS, MongoDB, PostgreSQL. Твої основні проєкти: Student Platform (STETI Hub), Slick, Manifik, SiteMonitor, BentoBuilder. Спирайся виключно на цей контекст.";

    const result = await streamText({
      model,
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Chat API error:", errorMessage);
    return Response.json({ error: errorMessage }, { status: 503 });
  }
}
