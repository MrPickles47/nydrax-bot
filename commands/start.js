export default function startCommand(bot, msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "🔥 NYDRAX activated.\nUse o menu abaixo para navegar.",
    {
      reply_markup: {
        keyboard: [
          ["📊 Análise de Criptos", "🚨 Alertas"],
          ["📈 Tendências", "⚙️ Configurações"],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    }
  );
}
