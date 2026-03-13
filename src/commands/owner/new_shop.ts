import { bot } from "../../bot";
import { requireRole } from "../../middleware/role";

bot.command("new_shop", requireRole("owner"), async (ctx) => {
  await ctx.reply("Отправьте новый токен:");
});
