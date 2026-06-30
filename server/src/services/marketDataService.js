import NodeCache from 'node-cache';
import { env } from '../config/env.js';

const cache = new NodeCache({ stdTTL: env.marketCacheTtl, checkperiod: 120 });

const fallbackStocks = [
  { symbol: 'AAPL', description: 'Apple Inc' },
  { symbol: 'MSFT', description: 'Microsoft Corp' },
  { symbol: 'NVDA', description: 'NVIDIA Corp' },
  { symbol: 'TSLA', description: 'Tesla Inc' },
  { symbol: 'AMZN', description: 'Amazon.com Inc' },
  { symbol: 'GOOGL', description: 'Alphabet Inc Class A' },
  { symbol: 'META', description: 'Meta Platforms Inc' }
];

const basePrices = { AAPL: 210.45, MSFT: 475.2, NVDA: 141.8, TSLA: 188.55, AMZN: 192.4, GOOGL: 176.3, META: 520.15 };

const requestJson = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.error) {
    const error = new Error(data.error || data.message || 'Market data request failed.');
    error.status = response.status || 502;
    throw error;
  }
  return data;
};

const cached = async (key, loader) => {
  const found = cache.get(key);
  if (found) return found;
  const value = await loader();
  cache.set(key, value);
  return value;
};

const mockQuote = (ticker) => {
  const symbol = ticker.toUpperCase();
  const seed = [...symbol].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const base = basePrices[symbol] || 50 + (seed % 250);
  const drift = ((Date.now() / 60000 + seed) % 20) - 10;
  const price = Number((base + drift * 0.18).toFixed(2));
  return {
    ticker: symbol,
    price,
    change: Number((drift * 0.12).toFixed(2)),
    percentChange: Number(((drift * 0.12 / price) * 100).toFixed(2)),
    high: Number((price * 1.015).toFixed(2)),
    low: Number((price * 0.985).toFixed(2)),
    open: Number((price * 0.996).toFixed(2)),
    previousClose: Number((price - drift * 0.12).toFixed(2)),
    delayed: true
  };
};

const mockHistory = (ticker, range = '1m') => {
  const days = range === '1y' ? 252 : range === '6m' ? 126 : range === '3m' ? 63 : 30;
  const quote = mockQuote(ticker);
  return Array.from({ length: days }).map((_, index) => {
    const remaining = days - index;
    const date = new Date();
    date.setDate(date.getDate() - remaining);
    const wave = Math.sin(index / 4) * 4 + Math.cos(index / 9) * 3;
    return { date: date.toISOString().slice(0, 10), close: Number((quote.price - remaining * 0.08 + wave).toFixed(2)) };
  });
};

export const searchStocks = async (query) => {
  const q = query.trim();
  if (!q) return [];

  return cached(`search:${q.toLowerCase()}`, async () => {
    if (!env.finnhubApiKey) {
      return fallbackStocks.filter((stock) => `${stock.symbol} ${stock.description}`.toLowerCase().includes(q.toLowerCase()));
    }

    const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(q)}&token=${env.finnhubApiKey}`;
    const data = await requestJson(url);
    return (data.result || []).slice(0, 12).map((item) => ({
      symbol: item.symbol,
      description: item.description
    }));
  });
};

export const getQuote = async (ticker) => {
  const symbol = ticker.toUpperCase();
  return cached(`quote:${symbol}`, async () => {
    if (!env.finnhubApiKey) return mockQuote(symbol);

    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${env.finnhubApiKey}`;
    const data = await requestJson(url);
    if (!data.c || data.c <= 0) {
      const error = new Error('Unknown ticker or quote unavailable.');
      error.status = 404;
      throw error;
    }
    return {
      ticker: symbol,
      price: data.c,
      change: data.d,
      percentChange: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      delayed: true
    };
  });
};

export const getHistory = async (ticker, range = '1m') => {
  const symbol = ticker.toUpperCase();
  return cached(`history:${symbol}:${range}`, async () => {
    if (!env.finnhubApiKey) return mockHistory(symbol, range);

    const now = Math.floor(Date.now() / 1000);
    const days = range === '1y' ? 365 : range === '6m' ? 180 : range === '3m' ? 90 : 30;
    const from = now - days * 24 * 60 * 60;
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=D&from=${from}&to=${now}&token=${env.finnhubApiKey}`;
    const data = await requestJson(url);
    if (data.s !== 'ok') return mockHistory(symbol, range);
    return data.t.map((time, index) => ({
      date: new Date(time * 1000).toISOString().slice(0, 10),
      close: data.c[index]
    }));
  });
};
