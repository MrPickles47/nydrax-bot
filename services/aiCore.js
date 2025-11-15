// services/aiCore.js
import axios from "axios";
import OpenAI from "openai";
import { env } from "../config/env.js";

/**
 * AI Core: coleta métricas básicas e pede à OpenAI um resumo / análise.
 */

// cria cliente OpenAI com a chave do env
const openaiClient = new OpenAI({ apiKey: env.openaiKey });

// --- Helpers de coleta ---

async function fetchCoinGeckoDataBySymbol(symbol) {
  try {
    const listRes = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    const coins = listRes.data;
    const found = coins.find(c => c.symbol?.toLowerCase() === symbol.toLowerCase());
    if (!found) return null;

    const id = found.id;
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
    );
    return res.data;
  } catch (err) {
    console.error("CoinGecko fetch error:", err?.message || err);
    return null;
  }
}

async function fetchDexScreener(token) {
  try {
    const res = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${token}`);
    return res.data;
  } catch (err) {
    return null;
  }
}

function computeSimpleScore(metrics) {
  const v = Math.log10((metrics.volume24h || 1) + 1);
  const m = Math.log10((metrics.marketCap || 1) + 1);
  const h = metrics.topHolderPercent ? Math.max(0, 1 - metrics.topHolderPercent) : 0.5;
  const s = (metrics.socialScore || 0) / 100.0;
  let raw = v * 0.5 + m * 0.3 + h * 2.0 + s * 1.0;
  const score = Math.max(0, Math.min(100, Math.round(raw * 12)));
  return score;
}

// função principal
export async function analyzeToken(input) {
  const symbol = input.trim();

  const cg = await fetchCoinGeckoDataBySymbol(symbol);

  const metrics = {
    name: cg?.name || symbol,
    symbol: symbol,
    price: cg?.market_data?.current_price?.usd || null,
    marketCap: cg?.market_data?.market_cap?.usd || null,
    volume24h: cg?.market_data?.total_volume?.usd || null,
    holders: null,
    topHolderPercent: null,
    liquidity: null,
    socialScore: cg?.community_data?.twitter_followers || 0
  };

  const dex = await fetchDexScreener(symbol);
  if (dex && dex.pairs && dex.pairs.length > 0) {
    const p = dex.pairs[0];
    metrics.volume24h = metrics.volume24h || p.volumeUsd || null;
    metrics.liquidity = p.liquidityUsd || null;
  }

  const score = computeSimpleScore({
    volume24h: metrics.volume24h,
    marketCap: metrics.marketCap,
    holders: metrics.holders,
    topHolderPercent: metrics.topHolderPercent,
    socialScore: metrics.socialScore,
    liquidity: metrics.liquidity
  });

  const prompt = `
You are a professional crypto analyst. Given the following token metrics, produce:
1) A short 2-line summary.
2) A detailed analysis as bullet points (liquidity, volume, market cap, holder concentration, social signals, risk).
3) A single numeric "NYDRAX_SCORE" between 0 and 100.
4) One actionable suggestion for a trader.

Metrics:
Name: ${metrics.name}
Symbol: ${metrics.symbol}
Price(USD): ${metrics.price ?? "unknown"}
MarketCap(USD): ${metrics.marketCap ?? "unknown"}
Volume24h(USD): ${metrics.volume24h ?? "unknown"}
Liquidity(USD): ${metrics.liquidity ?? "unknown"}
SocialFollowers(Twitter): ${metrics.socialScore ?? 0}
TopHolderPercent: ${metrics.topHolderPercent ?? "unknown"}
Holders: ${metrics.holders ?? "unknown"}

Answer in JSON with keys: short_summary, detailed_analysis (array), nydrax_score, action.
  `;

  try {
    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700,
      temperature: 0.2
    });

    const text = response.choices?.[0]?.message?.content ?? "";
    let parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      parsed = {
        short_summary: text.split("\n").slice(0, 2).join(" "),
        detailed_analysis: [text],
        nydrax_score: score,
        action: "Review the details above."
      };
    }

    return {
      metrics,
      ai: parsed,
      computed_score: score
    };
  } catch (err) {
    console.error("OpenAI error:", err?.message || err);
    return {
      metrics,
      ai: {
        short_summary: "AI analysis currently unavailable.",
        detailed_analysis: [],
        nydrax_score: score,
        action: "Retry later or check API key."
      },
      computed_score: score
    };
  }
}
