import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  cashBalance: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    cashBalance: this.cashBalance,
    role: this.role,
    createdAt: this.createdAt
  };
};

export const User = mongoose.model('User', userSchema);
