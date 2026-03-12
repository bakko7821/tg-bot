import { getUserByTelegramId } from "../database/queries/user";

export function requireRole(role: string) {
  return async (ctx: any, next: any) => {
    const telegramId = ctx.from.id;

    const user = await getUserByTelegramId(telegramId);

    if (!user || user.role !== role) {
      return ctx.reply("У вас нет доступа к этой команде.");
    }

    return next();
  };
}
