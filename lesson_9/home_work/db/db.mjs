import mongoose from 'mongoose';
import config from '../config/default.js';

export const connectDB = async () => {
    try {
        mongoose.set('sanitizeFilter', true)
        mongoose.set('strictQuery', true)
        mongoose.set('sanitizeProjection', true)
        await mongoose.connect(config.mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}