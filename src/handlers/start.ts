import { bot } from "../bot";
import { userService } from "../services/user.service";

bot.start(async (ctx) => {
  if (!ctx.from) return;

  await userService.register(ctx.from);

  ctx.reply("Ты зарегистрирован 🤖");
});
