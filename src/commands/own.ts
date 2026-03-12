import { Markup } from "telegraf";
import { bot } from "../bot";
import { getUser } from "../database/queries/user";
import { requireRole } from "../middleware/role";
import { waitingForUserId } from "../state";

let lastTargetId: number | null = null;

// === === === === ===
// Функции
// === === === === ===

async function getTargetUser(ctx: any) {
  if (!lastTargetId) {
    await ctx.editMessageText("Ошибка. ID не найден.");
    return null;
  }

  const user = await getUser(lastTargetId);

  if (!user) {
    await ctx.editMessageText("Пользователь не найден.");
    return null;
  }

  return user;
}

async function setRole(ctx: any, role: string) {
  await ctx.answerCbQuery();

  const user = await getTargetUser(ctx);
  if (!user) return;

  // тут позже будет updateRole()
  // await updateUserRole(user.telegram_id, role);

  await ctx.editMessageText(
    `Роль пользователя: @${user.username}, изменена на ${role}`,
  );
}

export async function handleOwnReply(ctx: any) {
  const text = ctx.message.text;
  const userId = ctx.from.id;

  if (!waitingForUserId.has(userId)) return false;

  const targetId = Number(text);

  if (isNaN(targetId)) {
    await ctx.reply("Это не похоже на Telegram ID.");
    return true;
  }

  waitingForUserId.delete(userId);
  lastTargetId = targetId;

  await ctx.reply(
    `ID ${targetId} получен.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Информация", "own_info")],
      [Markup.button.callback("Изменить роль", "own_change_role")],
    ]),
  );

  return true;
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

  if (!lastTargetId) {
    await ctx.editMessageText("Ошибка. ID не найден.");
    return;
  }

  const user = await getUser(lastTargetId);

  if (!user) {
    await ctx.editMessageText("Пользователь не найден.");
    return;
  }

  await ctx.editMessageText(
    `Имя: ${user.first_name}
    Фамилия: ${user.last_name}
    Username: ${user.username}`,
  );
});

bot.action("own_change_role", async (ctx) => {
  await ctx.answerCbQuery();

  const user = await getTargetUser(ctx);
  if (!user) return;

  await ctx.editMessageText(
    `Пользователь: @${user.username}, сейчас обладает правами: ${user.role}. Выберите роль.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("Пользователь", "set_role:user")],
      [Markup.button.callback("VIP", "set_role:vip")],
      [Markup.button.callback("Админ", "set_role:admin")],
    ]),
  );
});

bot.action(/set_role:(.+)/, async (ctx) => {
  await ctx.answerCbQuery();

  const role = ctx.match[1];

  const user = await getTargetUser(ctx);
  if (!user) return;

  await ctx.editMessageText(
    `Роль пользователя: @${user.username}, изменена на ${role}`,
  );
});
