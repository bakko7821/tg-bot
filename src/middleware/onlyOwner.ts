import { isOwner } from "../utils/roles";

export function onlyOwner(handler: any) {
  return async (ctx: any) => {
    const tgId = ctx.from?.id;
    if (!tgId) return;

    const ok = await isOwner(tgId);

    if (!ok) {
      return ctx.reply("⛔ Нет доступа");
    }

    return handler(ctx);
  };
}
