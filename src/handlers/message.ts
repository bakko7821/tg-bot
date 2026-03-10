import { bot } from "../bot";

bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  await ctx.reply(`Ты написал: ${text}`);
});
