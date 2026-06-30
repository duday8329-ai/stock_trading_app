import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  cashBalance: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    cashBalance: this.cashBalance,
    createdAt: this.createdAt
  };
};

export const User = mongoose.model('User', userSchema);
