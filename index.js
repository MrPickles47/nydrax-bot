import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

import { handleStart } from "./handlers/start.js";
import { handleInfo } from "./handlers/info.js";
import { handleAI } from "./handlers/ai.js";

import { askAI } from "./core/ai.js";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  // Comandos
  if (text === "/start") return handleStart(bot, chatId);
  if (text === "/info") return handleInfo(bot, chatId);

  // Comando /ai pergunta específica
  if (text.startsWith("/ai")) {
    const pergunta = text.replace("/ai", "").trim();
    if (pergunta.length === 0)
      return bot.sendMessage(chatId, "Digite algo após /ai");
    return handleAI(bot, chatId, pergunta);
  }

  // Resposta padrão: mandar pra IA
  await bot.sendMessage(chatId, "🧠 Processando...");
  const resposta = await askAI(text);
  bot.sendMessage(chatId, resposta);
});
