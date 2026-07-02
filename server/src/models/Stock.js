import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    ticker: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    sector: { type: String, trim: true, default: 'Other' },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Stock = mongoose.model('Stock', stockSchema);
