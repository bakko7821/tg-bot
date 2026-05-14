import { isSubscriber } from "../utils/roles";

export function oblySubscriber(handler: any) {
  return async (ctx: any) => {
    const tgId = ctx.from?.id;
    if (!tgId) return;

    const ok = await isSubscriber(tgId);

    if (!ok) {
      return ctx.reply("У вас отсутствует подписка!");
    }

    return handler(ctx);
  };
}
