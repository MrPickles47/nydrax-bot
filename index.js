import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

import { askAI } from "./core/ai.js";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  await bot.sendMessage(chatId, "🧠 Processando...");

  try {
    const reply = await askAI(text);
    await bot.sendMessage(chatId, reply);
  } catch (err) {
    console.error(err);
    await bot.sendMessage(chatId, "❌ Erro ao contactar o Nydrax AI Core.");
  }
});
