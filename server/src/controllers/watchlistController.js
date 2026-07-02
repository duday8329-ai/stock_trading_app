import { Watchlist } from '../models/Watchlist.js';
import { getQuote } from '../services/marketDataService.js';

const normalizeTicker = (value) => String(value || '').trim().toUpperCase();

export const getWatchlist = async (req, res) => {
  const watchlist = await Watchlist.findOne({ userId: req.user._id });
  const tickers = watchlist?.tickers || [];
  const stocks = await Promise.all(
    tickers.map(async (ticker) => {
      try {
        return await getQuote(ticker);
      } catch {
        return { ticker, unavailable: true };
      }
    })
  );
  res.json({ stocks });
};

export const addToWatchlist = async (req, res) => {
  const ticker = normalizeTicker(req.body.ticker);
  if (!/^[A-Z.]{1,10}$/.test(ticker)) {
    return res.status(400).json({ message: 'Enter a valid ticker.' });
  }
  await getQuote(ticker);
  const watchlist = await Watchlist.findOneAndUpdate(
    { userId: req.user._id },
    { $addToSet: { tickers: ticker } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(201).json({ tickers: watchlist.tickers, message: `${ticker} added to watchlist.` });
};

export const removeFromWatchlist = async (req, res) => {
  const ticker = normalizeTicker(req.params.ticker);
  const watchlist = await Watchlist.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { tickers: ticker } },
    { new: true }
  );
  res.json({ tickers: watchlist?.tickers || [], message: `${ticker} removed from watchlist.` });
};
