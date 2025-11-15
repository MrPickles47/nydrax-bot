import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import OpenAI from "openai";

import { logInfo, logError, logUser } from "./log.js";
import { sendMainMenu, handleMenuCallbacks } from "./features/menu.js";

dotenv.config();

// ───────────────────────────────────────────────
// Inicializa o Telegram Bot
// ───────────────────────────────────────────────
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

// ───────────────────────────────────────────────
// Inicializa o cliente OpenAI
// ───────────────────────────────────────────────
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ───────────────────────────────────────────────
// Logs iniciais
// ───────────────────────────────────────────────
logInfo("🚀 Nydrax AI Bot iniciado");

// Ativa os handlers dos botões do menu
handleMenuCallbacks(bot);

// ───────────────────────────────────────────────
// Evento principal de mensagens
// ───────────────────────────────────────────────
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  logUser(chatId, text); // loga tudo que o usuário escreve

  if (!text) return;

  // Comando de menu
  if (text === "/menu") {
    sendMainMenu(bot, chatId);
    return;
  }

  // Resposta padrão com IA
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

    logInfo(`Resposta gerada pela IA: ${aiReply}`);

    bot.sendMessage(chatId, aiReply);

  } catch (error) {
    console.error(error);
    logError(error.message);

    bot.sendMessage(chatId, "❌ Erro ao contactar o Nydrax AI Core.");
  }
});
