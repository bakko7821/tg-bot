import { Telegraf } from "telegraf";

export function registerBotHandlers(bot: Telegraf) {
  bot.start(async (ctx) => {
    await ctx.reply("Бот работает ✅");
  });

  bot.command("help", async (ctx) => {
    await ctx.reply("Помощь");
  });
}
