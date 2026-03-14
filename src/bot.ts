import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN не найден в .env");
}

export const bot = new Telegraf(token);
