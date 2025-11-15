export default function menuCommand(bot, msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "📌 Menu principal do Nydrax:", {
    reply_markup: {
      keyboard: [
        ["📊 Análise de Criptos", "🚨 Alertas"],
        ["📈 Tendências", "⚙️ Configurações"],
      ],
      resize_keyboard: true,
    },
  });
}
