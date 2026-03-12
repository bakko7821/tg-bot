import { Context, Markup } from "telegraf";
import { bot } from "../bot";
import { getUser, updateUserRole } from "../database/queries/user";
import { requireRole } from "../middleware/role";
import { waitingForUserId } from "../state";

const targetUsers = new Map<number, number>();

// === === === === ===
// Функции
// === === === === ===

async function getTargetUser(ctx: Context) {
  if (!ctx.from) return null;

  const adminId = ctx.from.id;
  const targetId = targetUsers.get(adminId);

  if (!targetId) return null;

  return await getUser(targetId);
}

export async function handleOwnReply(ctx: Context) {
  if (!ctx.from || !ctx.message || !("text" in ctx.message)) return;

  const text = ctx.message.text;
  const adminId = ctx.from.id;

  if (!waitingForUserId.has(adminId)) return false;

  const targetId = Number(text);

  if (isNaN(targetId)) {
    await ctx.reply("Это не похоже на Telegram ID.");
    return true;
  }

  waitingForUserId.delete(adminId);
  targetUsers.set(adminId, targetId);

  await ctx.reply(
    `ID ${targetId} получен.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Информация", "own_info")],
      [Markup.button.callback("Изменить роль", "own_change_role")],
    ]),
  );

  return true;
}

async function renderOwnMenu(ctx: Context) {
  const user = await getTargetUser(ctx);
  if (!user) {
    await ctx.editMessageText("Пользователь не найден.");
    return;
  }

  await ctx.editMessageText(
    `Пользователь: ${user.username ?? user.telegram_id}\nЧто сделать?`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Информация", "own_info")],
      [Markup.button.callback("Изменить роль", "own_change_role")],
    ]),
  );
}

// === === === === ===
// Обработчики событий
// === === === === ===

bot.command("own", requireRole("owner"), async (ctx) => {
  waitingForUserId.add(ctx.from.id);
  await ctx.reply("Отправьте id пользователя.");
});

bot.action("own_info", async (ctx) => {
  await ctx.answerCbQuery();

  const user = await getTargetUser(ctx);
  if (!user) return;

  await ctx.editMessageText(
    `Пользователь: ${user.username ?? user.telegram_id}\nРоль: ${user.role}`,
    Markup.inlineKeyboard([[Markup.button.callback("Назад", "back")]]),
  );
});

bot.action("back", async (ctx) => {
  await ctx.answerCbQuery();
  await renderOwnMenu(ctx);
});

bot.action("own_change_role", async (ctx) => {
  await ctx.answerCbQuery();

  const user = await getTargetUser(ctx);
  if (!user) return;

  await ctx.editMessageText(
    `Пользователь: ${user.username ?? user.telegram_id}\nТекущая роль: ${user.role}\n\nВыберите новую роль`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback("User", "set_role:user"),
        Markup.button.callback("VIP", "set_role:vip"),
        Markup.button.callback("Admin", "set_role:admin"),
      ],
      [Markup.button.callback("← Назад", "back")],
    ]),
  );
});

bot.action(/set_role:(.+)/, async (ctx) => {
  await ctx.answerCbQuery();

  const role = ctx.match[1];
  const user = await getTargetUser(ctx);

  if (!user) {
    await ctx.editMessageText("Пользователь не найден.");
    return;
  }

  const updatedUser = await updateUserRole(user.telegram_id, role);

  if (!updatedUser) {
    await ctx.editMessageText("Не удалось изменить роль.");
    return;
  }

  targetUsers.delete(ctx.from.id);

  await ctx.editMessageText(
    `Роль пользователя ${user.username ?? user.telegram_id} изменена на ${role}`,
  );
});
