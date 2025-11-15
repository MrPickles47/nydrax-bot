export function handleStart(bot, chatId) {
  bot.sendMessage(
    chatId,
    `🔥 Bem-vindo ao Nydrax AI!

Sou o seu assistente inteligente focado em análises, insights e respostas avançadas.

Digite qualquer coisa para começar, ou escolha um comando:

/info – Sobre o Nydrax
/ai – Perguntar para o Nydrax AI Core`
  );
}
