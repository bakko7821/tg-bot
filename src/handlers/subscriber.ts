import { bot } from "../bot";
import { oblySubscriber } from "../middleware/onlySubscriber";

bot.command(
  "test_sub",
  oblySubscriber(async (ctx: any) => {
    await ctx.reply("Подписка есть!");
  }),
);
