import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();
export default {
    dataBaseName: process.env.DATABASE_NAME,
    dataBaseUrl: process.env.DATABASE_URL,
    mongoURI: `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
    port: process.env.PORT,
    secretSessionKey: process.env.SECRET_SESSION_KEY
}
