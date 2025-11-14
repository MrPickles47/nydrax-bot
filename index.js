import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "🔥 Nydrax online.\nComo posso ajudar?");
});
