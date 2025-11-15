import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { env } from "./config/env.js";

import startCommand from "./commands/start.js";
import menuCommand from "./commands/menu.js";
import helpCommand from "./commands/help.js";

dotenv.config();

const bot = new TelegramBot(env.botToken, {
  polling: true,
});

console.log("🔥 Nydrax iniciado...");

// Mensagens de texto
bot.on("message", (msg) => {
  const text = msg.text;

  if (text === "/start") return startCommand(bot, msg);
  if (text === "/menu") return menuCommand(bot, msg);
  if (text === "/help") return helpCommand(bot, msg);

  bot.sendMessage(msg.chat.id, "📡 Comando não reconhecido.");
});
