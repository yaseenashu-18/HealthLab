import mongoose from 'mongoose';
import { ENV } from './env.js';

export let isMongoConnected = false;

export const connectDB = async (): Promise<boolean> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500, // Quick timeout for seamless fallback if mongo isn't running locally
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Database successfully.');
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.warn('⚠️  MongoDB connection unavailable. Activating HealthLab AI In-Memory Database Fallback for seamless authentication execution.');
    return false;
  }
};
