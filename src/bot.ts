import { Telegraf } from "telegraf";
import { env } from "./config/env";

export const bot = new Telegraf(env.BOT_TOKEN);
