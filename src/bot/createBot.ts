import { Telegraf } from "telegraf";

export function createBot(token: string) {
  console.log("Creating bot with token:", token.slice(0, 10));

  const bot = new Telegraf(token);

  bot.start((ctx) => ctx.reply("Bot started"));

  return bot;
}
