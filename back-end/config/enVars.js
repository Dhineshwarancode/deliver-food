import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS={
    MONGO_URI:process.env.CONNECTON_STRING,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
}