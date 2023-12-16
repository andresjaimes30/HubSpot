import dotenv from 'dotenv';
dotenv.config();
export const TOKEN = process.env.TOKEN;
export const TOKEN_MIRROR = process.env.TOKEN_MIRROR;
export const PORT = process.env.PORT || 3000;