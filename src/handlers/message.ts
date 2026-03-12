import { bot } from "../bot";
import { handleOwnReply } from "../commands/own";
import { waitingForUserId } from "../state";

bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  // обработчики команд
  if (await handleOwnReply(ctx)) return;

  if (text.startsWith("/")) return;

  await ctx.reply(`Ты написал: ${text}`);
});
