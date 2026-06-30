import { Holding } from '../models/Holding.js';
import { Transaction } from '../models/Transaction.js';
import { getQuote } from '../services/marketDataService.js';

const roundMoney = (value) => Math.round(value * 100) / 100;
const parsePositiveNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};

export const getPortfolio = async (req, res) => {
  const holdings = await Holding.find({ userId: req.user._id }).sort({ ticker: 1 });
  const enriched = await Promise.all(
    holdings.map(async (holding) => {
      const quote = await getQuote(holding.ticker);
      const marketValue = quote.price * holding.quantity;
      const costBasis = holding.avgBuyPrice * holding.quantity;
      return {
        id: holding._id,
        ticker: holding.ticker,
        quantity: holding.quantity,
        avgBuyPrice: holding.avgBuyPrice,
        currentPrice: quote.price,
        marketValue: roundMoney(marketValue),
        gainLoss: roundMoney(marketValue - costBasis),
        gainLossPercent: costBasis ? roundMoney(((marketValue - costBasis) / costBasis) * 100) : 0
      };
    })
  );

  const holdingsValue = enriched.reduce((sum, holding) => sum + holding.marketValue, 0);
  const totalCost = enriched.reduce((sum, holding) => sum + holding.avgBuyPrice * holding.quantity, 0);
  const totalValue = req.user.cashBalance + holdingsValue;

  res.json({
    cashBalance: roundMoney(req.user.cashBalance),
    holdings: enriched,
    holdingsValue: roundMoney(holdingsValue),
    totalPortfolioValue: roundMoney(totalValue),
    overallGainLoss: roundMoney(holdingsValue - totalCost)
  });
};

export const buy = async (req, res) => {
  const ticker = String(req.body.ticker || '').trim().toUpperCase();
  const quantity = parsePositiveNumber(req.body.quantity);
  if (!ticker || !quantity) return res.status(400).json({ message: 'Ticker and positive quantity are required.' });

  const quote = await getQuote(ticker);
  const totalCost = roundMoney(quote.price * quantity);
  if (totalCost > req.user.cashBalance) {
    return res.status(400).json({ message: 'Insufficient virtual cash for this buy order.' });
  }

  let holding = await Holding.findOne({ userId: req.user._id, ticker });
  if (holding) {
    const currentCost = holding.avgBuyPrice * holding.quantity;
    const newQuantity = holding.quantity + quantity;
    holding.avgBuyPrice = roundMoney((currentCost + totalCost) / newQuantity);
    holding.quantity = newQuantity;
  } else {
    holding = new Holding({ userId: req.user._id, ticker, quantity, avgBuyPrice: quote.price });
  }

  req.user.cashBalance = roundMoney(req.user.cashBalance - totalCost);
  if (req.user.cashBalance < 0 || holding.quantity < 0) {
    return res.status(400).json({ message: 'Trade would create an invalid account balance.' });
  }

  await req.user.save();
  await holding.save();
  await Transaction.create({ userId: req.user._id, ticker, type: 'buy', quantity, price: quote.price });

  res.status(201).json({ message: 'Buy order filled in simulation.', cashBalance: req.user.cashBalance, holding });
};

export const sell = async (req, res) => {
  const ticker = String(req.body.ticker || '').trim().toUpperCase();
  const quantity = parsePositiveNumber(req.body.quantity);
  if (!ticker || !quantity) return res.status(400).json({ message: 'Ticker and positive quantity are required.' });

  const holding = await Holding.findOne({ userId: req.user._id, ticker });
  if (!holding || holding.quantity < quantity) {
    return res.status(400).json({ message: 'Insufficient shares for this sell order.' });
  }

  const quote = await getQuote(ticker);
  const proceeds = roundMoney(quote.price * quantity);
  holding.quantity = roundMoney(holding.quantity - quantity);
  req.user.cashBalance = roundMoney(req.user.cashBalance + proceeds);

  if (req.user.cashBalance < 0 || holding.quantity < 0) {
    return res.status(400).json({ message: 'Trade would create an invalid account balance.' });
  }

  await req.user.save();
  if (holding.quantity === 0) await holding.deleteOne();
  else await holding.save();
  await Transaction.create({ userId: req.user._id, ticker, type: 'sell', quantity, price: quote.price });

  res.status(201).json({ message: 'Sell order filled in simulation.', cashBalance: req.user.cashBalance });
};

export const transactions = async (req, res) => {
  const items = await Transaction.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(200);
  res.json({ transactions: items });
};
