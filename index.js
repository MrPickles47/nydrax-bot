import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

// Usa a variável de ambiente
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // Resposta padrão
  bot.sendMessage(
    chatId,
    "🔥 Nydrax AI Core Online.\nComo posso ajudar você hoje?"
  );
});
