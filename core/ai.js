import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(message) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Você é o Nydrax AI Core, assistente do Lucas." },
      { role: "user", content: message }
    ]
  });

  return response.choices[0].message.content;
}
