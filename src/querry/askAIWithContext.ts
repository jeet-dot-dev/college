import { OpenAI } from "openai";
import dotenv from "dotenv" ;

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function askAIWithContext(
  question: string,
  matches: { metadata?: any }[]
): Promise<string> {
  try {
    const context = matches
      .map((m) => m.metadata?.rawText)
      .filter(Boolean)
      .join("\n");

    const prompt = `
You are an assistant for college students. Answer based only on the context below. Do not make up answers.

Context:
${context}

Student's Question: ${question}

Answer:
  `;

    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });
    return res.choices[0].message.content?.trim() || "No response generated.";
  } catch (error) {
    console.log(error);
    return "";
  }
}
