import { bot } from "../bot";

bot.command("help", (ctx) => {
  ctx.reply("Список команд: /start /help");
});
