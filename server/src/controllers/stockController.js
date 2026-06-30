import { getHistory, getQuote, searchStocks } from '../services/marketDataService.js';

export const search = async (req, res) => {
  const results = await searchStocks(req.query.q || '');
  res.json({ results });
};

export const quote = async (req, res) => {
  const data = await getQuote(req.params.ticker);
  res.json({ quote: data });
};

export const history = async (req, res) => {
  const data = await getHistory(req.params.ticker, req.query.range || '1m');
  res.json({ history: data });
};
