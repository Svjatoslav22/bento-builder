import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient({
  adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL, max: 1 })),
});

const openai = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, widgetId } = (await req.json()) as {
      messages: CoreMessage[];
      widgetId: string;
    };

    const widget = await prisma.widget.findUnique({
      where: { id: widgetId },
      include: { profile: true },
    });

    if (!widget) {
      return new Response("Widget not found", { status: 404 });
    }

    const profile = widget.profile;
    const widgetConfig = widget.config as Record<string, unknown>;
    const widgetContext = (widgetConfig?.context as string) || "";
    const systemPrompt = `Ти цифровий асистент, якого звати AI-клон. Ти відповідаєш на питання від імені розробника. Його звати ${profile.name}, він ${profile.title}. Його біо: ${profile.bio}. Додатковий контекст: ${widgetContext}. Відповідай коротко і професійно`;

    const result = await streamText({
      model: openai("meta-llama/llama-3.1-8b-instruct"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
