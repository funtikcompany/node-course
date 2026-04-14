import 'dotenv/config';
import mongoose from 'mongoose';

export default {
    dataBaseName: process.env.DATABASE_NAME,
    dataBaseUrl: process.env.DATABASE_URL,
    mongoURI: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
    port: process.env.PORT,
}
