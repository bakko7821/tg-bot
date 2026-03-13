import { bot } from "../../bot";
import { requireRole } from "../../middleware/role";

import { createShop } from "../../database/queries/shops";

import { encrypt } from "../../database/utils/encrypt";
import { emitShopCreated } from "../../events/shopEvents";

type ShopCreationState = {
  step: "token" | "name";
  token?: string;
};

const shopCreationState = new Map<number, ShopCreationState>();

/*
COMMAND
*/

bot.command("new_shop", requireRole("owner"), async (ctx) => {
  const userId = ctx.from.id;

  shopCreationState.set(userId, {
    step: "token",
  });

  await ctx.reply("Отправьте токен нового бота:");
});

/*
MESSAGE HANDLER
*/

bot.on("text", async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  const state = shopCreationState.get(userId);

  if (!state) return;

  /*
  STEP 1 — TOKEN
  */

  if (state.step === "token") {
    const token = text.trim();

    await ctx.deleteMessage();

    shopCreationState.set(userId, {
      step: "name",
      token,
    });

    await ctx.reply("Введите название магазина:");

    return;
  }

  /*
  STEP 2 — NAME
  */

  if (state.step === "name") {
    const name = text.trim();

    const encrypted = encrypt(state.token!);

    const shop = await createShop(userId, name, encrypted);

    shopCreationState.delete(userId);

    await ctx.reply(`✅ Магазин "${name}" создан`);

    emitShopCreated({
      shopId: shop.id,
      shopName: name,
      tokenEncrypted: encrypted,
    });

    console.log("EVENT shop.created emitted");

    return;
  }
});
