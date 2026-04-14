import mongoose from 'mongoose';
import config from '../config/default.mjs';

export const connectDB = async () => {
    try {
        // ✅ захист від selector injection
        mongoose.set('sanitizeFilter', true)

        // ✅ відкидає поля, яких нема в схемі (зазвичай ок)
        mongoose.set('strictQuery', true)

        // ✅ Забороняє рядкові значення в projection (типу { name: "$password" }
        // ✅ Забороняє“перевизначити” поля, що були select: false за замовчуванням (тобто не дає витягнути сховані поля через +password)
        mongoose.set('sanitizeProjection', true)
        await mongoose.connect(config.mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}