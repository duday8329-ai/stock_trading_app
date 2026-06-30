import bcrypt from 'bcryptjs';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { Holding } from './models/Holding.js';
import { Transaction } from './models/Transaction.js';
import { User } from './models/User.js';

await connectDb();

const email = 'demo@sbstocks.local';
const passwordHash = await bcrypt.hash('DemoPass123!', 12);

await User.deleteOne({ email });
const user = await User.create({
  name: 'Demo Trader',
  email,
  passwordHash,
  cashBalance: env.startingCash - 14500
});

await Holding.deleteMany({ userId: user._id });
await Transaction.deleteMany({ userId: user._id });

await Holding.create([
  { userId: user._id, ticker: 'AAPL', quantity: 20, avgBuyPrice: 185 },
  { userId: user._id, ticker: 'MSFT', quantity: 15, avgBuyPrice: 410 }
]);

await Transaction.create([
  { userId: user._id, ticker: 'AAPL', type: 'buy', quantity: 20, price: 185 },
  { userId: user._id, ticker: 'MSFT', type: 'buy', quantity: 15, price: 410 }
]);

console.log('Seeded demo user: demo@sbstocks.local / DemoPass123!');
process.exit(0);
