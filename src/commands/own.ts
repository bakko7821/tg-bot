import { Markup } from "telegraf";
import { bot } from "../bot";
import { getUserByTelegramId } from "../database/queries/user";
import { requireRole } from "../middleware/role";

// bot.command("menu", (ctx) => {
//   ctx.reply(
//     "Выберите услугу",
//     Markup.inlineKeyboard([[Markup.button.callback("Маникюр 💅", "nails")]]),
//   );
// });

// bot.action("nails", async (ctx) => {
//   await ctx.answerCbQuery();

//   await ctx.editMessageText("Выберите дату 📅");
// });

bot.command("own", requireRole("owner"), async (ctx) => {
  ctx.reply("текст 1");
});
