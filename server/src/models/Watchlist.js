import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    tickers: [{ type: String, uppercase: true, trim: true }]
  },
  { timestamps: true }
);

export const Watchlist = mongoose.model('Watchlist', watchlistSchema);
