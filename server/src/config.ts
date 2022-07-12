import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
export const CLIENT_URL = process.env.CLIENT_URL;
