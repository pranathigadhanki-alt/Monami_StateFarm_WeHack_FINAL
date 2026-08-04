import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `You are Mona, a friendly assistant for a home insurance app.

You help users:
- understand risk scores
- understand policies
- navigate the app
- learn about renewals

Rules:
- Keep responses SHORT (2–3 sentences max)
- Be clear and helpful
- Use simple language
- Be friendly and conversational
- Do NOT hallucinate data`;

export async function generateMonaResponse(userMessage: string, context?: unknown) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelCandidates = [
    "gemini-1.5-flash",
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash",
  ];

  const prompt = [
    systemPrompt,
    context ? `Context:\n${JSON.stringify(context)}` : "",
    `User message: ${userMessage}`,
    "Assistant response:",
  ]
    .filter(Boolean)
    .join("\n\n");

  let lastError: unknown = null;

  for (const modelName of modelCandidates) {
    try {
      const result = await genAI
        .getGenerativeModel({ model: modelName })
        .generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini response failed");
}
