import { bot } from "../bot";

bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  if (text.startsWith("/")) return;

  await ctx.reply(`Ты написал: ${text}`);
});
