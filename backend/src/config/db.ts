import mongoose from 'mongoose';
import { ENV } from './env.js';

export let isMongoConnected = false;

export const connectDB = async (): Promise<boolean> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Atlas Database successfully.');
    return true;
  } catch (error: any) {
    isMongoConnected = false;
    console.warn(`⚠️  MongoDB connection warning: ${error?.message || 'Connection timeout'}. Activating HealthLab AI In-Memory Fallback.`);
    return false;
  }
};
