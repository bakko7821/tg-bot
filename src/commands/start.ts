import { bot } from "../bot";
import { createUser } from "../database/queries/user";

bot.start(async (ctx) => {
  ctx.reply("Привет. Бот запущен 🚀");
  await createUser(ctx.from);
});
