import { askAI } from "../core/ai.js";

export async function handleAI(bot, chatId, text) {
  try {
    const response = await askAI(text);
    bot.sendMessage(chatId, response);
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "❌ Erro ao contactar o Nydrax AI Core.");
  }
}
