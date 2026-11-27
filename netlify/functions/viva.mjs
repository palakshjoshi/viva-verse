import { GoogleGenAI } from "@google/genai";

// Credentials and base URL are supplied at runtime by Netlify AI Gateway.
const ai = new GoogleGenAI({});
const MODEL = "gemini-flash-latest";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "POST required" }, 405);

  try {
    const { mode, subject, level, question, answer, number = 0 } = await req.json();

    if (mode === "question") {
      const r = await ai.models.generateContent({
        model: MODEL,
        contents: `You are a supportive, accurate college viva examiner. Ask one fresh ${level} difficulty question on ${subject}. This is question number ${number}. Output only the question.`,
        config: { temperature: 0.7 },
      });
      const text = r.text?.trim();
      if (!text) throw new Error("AI returned an empty response");
      return json({ question: text });
    }

    if (mode === "evaluate") {
      const r = await ai.models.generateContent({
        model: MODEL,
        contents: `Evaluate a student's viva answer. Subject ${subject}, difficulty ${level}. Question: ${question}. Answer: ${answer}. Give fair partial credit. Return a score from 0 to 10 and short useful feedback mentioning accuracy and what to add.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: { score: { type: "integer" }, feedback: { type: "string" } },
            required: ["score", "feedback"],
          },
        },
      });
      const data = JSON.parse(r.text || "{}");
      const score = Math.max(0, Math.min(10, Math.round(Number(data.score)) || 0));
      return json({ score, feedback: String(data.feedback || "No feedback returned.") });
    }

    return json({ error: "Unknown mode" }, 400);
  } catch (e) {
    console.error("viva function error:", e);
    return json({ error: e?.message || "Server error" }, 500);
  }
};
