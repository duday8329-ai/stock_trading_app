import bcrypt from 'bcryptjs';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { Holding } from './models/Holding.js';
import { Transaction } from './models/Transaction.js';
import { User } from './models/User.js';
import { Stock } from './models/Stock.js';
import { Watchlist } from './models/Watchlist.js';

await connectDb();

const email = 'demo@sbstocks.local';
const adminEmail = 'admin@sbstocks.local';
const passwordHash = await bcrypt.hash('DemoPass123!', 12);

await User.deleteOne({ email });
await User.deleteOne({ email: adminEmail });
const user = await User.create({
  name: 'Demo Trader',
  email,
  passwordHash,
  cashBalance: env.startingCash - 14500
});
await User.create({
  name: 'SB Stocks Admin',
  email: adminEmail,
  passwordHash,
  role: 'admin',
  cashBalance: env.startingCash
});

await Holding.deleteMany({ userId: user._id });
await Transaction.deleteMany({ userId: user._id });
await Watchlist.deleteMany({ userId: user._id });

await Holding.create([
  { userId: user._id, ticker: 'AAPL', quantity: 20, avgBuyPrice: 185 },
  { userId: user._id, ticker: 'MSFT', quantity: 15, avgBuyPrice: 410 }
]);

await Transaction.create([
  { userId: user._id, ticker: 'AAPL', type: 'buy', quantity: 20, price: 185 },
  { userId: user._id, ticker: 'MSFT', type: 'buy', quantity: 15, price: 410 }
]);
await Watchlist.create({ userId: user._id, tickers: ['AAPL', 'MSFT', 'NVDA'] });
await Stock.deleteMany({});
await Stock.create([
  { ticker: 'AAPL', name: 'Apple Inc', sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Technology' },
  { ticker: 'NVDA', name: 'NVIDIA Corp', sector: 'Semiconductors' },
  { ticker: 'TSLA', name: 'Tesla Inc', sector: 'Automotive' }
]);

console.log('Seeded demo user: demo@sbstocks.local / DemoPass123!');
console.log('Seeded admin user: admin@sbstocks.local / DemoPass123!');
process.exit(0);
