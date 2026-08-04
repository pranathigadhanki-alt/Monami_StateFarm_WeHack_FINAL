import OpenAI from "openai";

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

function buildLocalMonaFallback(userMessage: string, context?: unknown) {
  const message = userMessage.toLowerCase();
  const contextJson = context ? JSON.stringify(context).toLowerCase() : "";

  if (message.includes("risk")) {
    return "Your risk score shows how likely a claim might be based on your home details. Lower is better because it can help reduce premiums. You can improve it with safety features and by reviewing the survey details.";
  }

  if (message.includes("policy") || message.includes("premium") || message.includes("basic")) {
    return "Basic policies usually cost less but cover fewer scenarios, while Premium gives broader protection. If your risk is moderate or high, Premium often gives better long-term value. I can help you compare based on your profile.";
  }

  if (message.includes("renewal") || message.includes("recommend")) {
    return "At renewal, review your latest risk score and home updates first. Improving safety features can help your next quote. I can guide you through what to check before you renew.";
  }

  if (message.includes("where") || message.includes("navigate") || message.includes("go")) {
    return "You can move through exhibits to learn risks, policies, and recommendations step by step. The dashboard shows your latest progress and score. Your account page shows history and profile details.";
  }

  if (contextJson.includes("riskscore")) {
    return "I can help explain your current score and what affects it most. Small updates like safety improvements can make a noticeable difference over time. Ask me and I can suggest practical next steps.";
  }

  return "I can help with risk scores, policies, renewals, and where to go in the app. Ask one specific question and I’ll keep it simple. We can go step by step.";
}

export async function generateMonaResponse(userMessage: string, context?: unknown) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_OPENAI_API_KEY");
  }

  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const contextText = context ? `\n\nContext:\n${JSON.stringify(context)}` : "";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `${userMessage}${contextText}` },
      ],
      temperature: 0.5,
    });

    const text = response.choices?.[0]?.message?.content?.trim();
    if (text) return text;
  } catch {
    // Fall through to local assistant response below.
  }

  return buildLocalMonaFallback(userMessage, context);
}
