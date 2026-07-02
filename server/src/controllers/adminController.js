import { Stock } from '../models/Stock.js';

const fields = (body) => ({
  ticker: String(body.ticker || '').trim().toUpperCase(),
  name: String(body.name || '').trim(),
  sector: String(body.sector || 'Other').trim(),
  active: body.active !== false
});

const validate = (stock) => /^[A-Z.]{1,10}$/.test(stock.ticker) && stock.name.length >= 2;

export const listStocks = async (req, res) => {
  res.json({ stocks: await Stock.find().sort({ ticker: 1 }) });
};

export const createStock = async (req, res) => {
  const stock = fields(req.body);
  if (!validate(stock)) return res.status(400).json({ message: 'Valid ticker and stock name are required.' });
  res.status(201).json({ stock: await Stock.create(stock) });
};

export const updateStock = async (req, res) => {
  const stock = fields(req.body);
  if (!validate(stock)) return res.status(400).json({ message: 'Valid ticker and stock name are required.' });
  const updated = await Stock.findByIdAndUpdate(req.params.id, stock, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Stock record not found.' });
  res.json({ stock: updated });
};

export const deleteStock = async (req, res) => {
  const deleted = await Stock.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Stock record not found.' });
  res.status(204).end();
};
