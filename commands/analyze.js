// commands/analyze.js
import { analyzeToken } from "../services/aiCore.js";

export default async function analyzeCommand(bot, msg, args) {
  const chatId = msg.chat.id;
  const query = (args || []).join(" ").trim();
  if (!query) {
    return bot.sendMessage(chatId, "✳️ Use: /analyze <symbol or token_address> (ex: /analyze SOL)");
  }

  await bot.sendMessage(chatId, `🔎 Analisando *${query}* ...`, { parse_mode: "Markdown" });

  try {
    const result = await analyzeToken(query);

    const short = result.ai?.short_summary ?? `Score: ${result.computed_score}`;
    const score = result.ai?.nydrax_score ?? result.computed_score;
    const detail = Array.isArray(result.ai?.detailed_analysis)
      ? result.ai.detailed_analysis.join("\n\n")
      : (result.ai?.detailed_analysis || "");

    const out = `*${result.metrics.name}* (${result.metrics.symbol})\n\n` +
                `*NYDRAX SCORE:* ${score}\n\n` +
                `*Summary:* ${short}\n\n` +
                `*Details:*\n${detail}\n\n` +
                `_Metrics:_ Price: ${result.metrics.price ?? "?"} USD | 24h Vol: ${result.metrics.volume24h ?? "?"} USD | MarketCap: ${result.metrics.marketCap ?? "?"} USD`;

    if (out.length < 4000) {
      await bot.sendMessage(chatId, out, { parse_mode: "Markdown" });
    } else {
      const parts = out.match(/[\s\S]{1,3000}/g) || [out];
      for (const p of parts) await bot.sendMessage(chatId, p, { parse_mode: "Markdown" });
    }
  } catch (err) {
    console.error("Analyze command error:", err);
    bot.sendMessage(chatId, "❌ Erro ao analisar. Tente novamente mais tarde.");
  }
}
