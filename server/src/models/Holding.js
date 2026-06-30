import mongoose from 'mongoose';

const holdingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  ticker: { type: String, required: true, uppercase: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  avgBuyPrice: { type: Number, required: true, min: 0 }
});

holdingSchema.index({ userId: 1, ticker: 1 }, { unique: true });

export const Holding = mongoose.model('Holding', holdingSchema);
