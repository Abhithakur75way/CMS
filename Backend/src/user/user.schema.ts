import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Role-based access control
    refreshToken: { type: String }, // Store refresh token
    createdAt: { type: Date, default: Date.now },
  });

export const User = model('User', userSchema);