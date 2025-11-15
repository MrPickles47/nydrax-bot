import TelegramBot from "node-telegram-bot-api";

export function sendMainMenu(bot, chatId) {
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🤖 IA", callback_data: "ia" },
          { text: "🔧 Ferramentas", callback_data: "tools" }
        ],
        [
          { text: "📊 Painel", callback_data: "panel" },
          { text: "🆘 Suporte", callback_data: "support" }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, "📌 Menu principal do Nydrax AI", options);
}

export function handleMenuCallbacks(bot) {
  bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data === "ia") {
      bot.sendMessage(chatId, "🤖 Acessando módulo de IA...");
    }

    if (data === "tools") {
      bot.sendMessage(chatId, "🔧 Ferramentas disponíveis...");
    }

    if (data === "panel") {
      bot.sendMessage(chatId, "📊 Abrindo painel...");
    }

    if (data === "support") {
      bot.sendMessage(chatId, "🆘 Suporte Nydrax aberto!");
    }
  });
}
