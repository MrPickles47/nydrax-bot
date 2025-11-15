export function sendMainMenu(bot, chatId) {
  bot.sendMessage(chatId, "📍 *Menu principal — Nydrax AI*", {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🤖 IA — Perguntar", callback_data: "ask_ai" }
        ],
        [
          { text: "⚙ Ferramentas", callback_data: "tools" },
          { text: "📊 Status", callback_data: "status" }
        ],
        [
          { text: "🧹 Limpar Tela", callback_data: "clear" }
        ]
      ]
    }
  });
}

export function handleMenuCallbacks(bot) {
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const action = query.data;

    if (action === "ask_ai") {
      bot.sendMessage(chatId, "✍️ Manda sua pergunta para a IA!");
    }

    if (action === "tools") {
      bot.sendMessage(chatId, "🛠 Ferramentas em construção!");
    }

    if (action === "status") {
      bot.sendMessage(chatId, "📊 *Status do sistema:*\nTudo operando normalmente.", {
        parse_mode: "Markdown"
      });
    }

    if (action === "clear") {
      bot.sendMessage(chatId, "✨ Limpei! Pode continuar.");
    }
  });
}
