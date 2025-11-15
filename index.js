import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

// Pega o token da variável do Railway
const token = process.env.TELEGRAM_BOT_TOKEN;

// Verificação caso a variável não esteja carregando
if (!token) {
  console.error("❌ ERRO: Variável TELEGRAM_BOT_TOKEN não encontrada!");
  process.exit(1);
}

const bot = new TelegramBot(token, {
  polling: true,
});

// Resposta inicial do bot
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🔥 Nydrax online.\nComo posso ajudar?");
});
