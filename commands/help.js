export default function helpCommand(bot, msg) {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    "ℹ️ Comandos disponíveis:\n/start – inicializa o bot\n/menu – mostra o menu principal\n/help – ajuda"
  );
}
