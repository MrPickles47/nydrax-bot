import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  bot.sendMessage(chatId, "🧠 Processando...");

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é o Nydrax AI Core, o assistente do Lucas." },
        { role: "user", content: text }
      ],
    });

    const aiReply = response.choices[0].message.content;
    bot.sendMessage(chatId, aiReply);

  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "❌ Erro ao contactar o Nydrax AI Core.");
  }
});
