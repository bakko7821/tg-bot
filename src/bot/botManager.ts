import { Telegraf } from "telegraf";
import { getAllShops } from "../database/queries/shops";
import { decrypt } from "../database/utils/decrypt";
import { eventBus } from "../events/eventBus";
import { registerBotHandlers } from "./registerHandlers";

type BotMap = Map<number, Telegraf>;

export const runningBots = new Map<number, Telegraf>();

export async function startShopBot(
  shopId: number,
  shopName: string,
  tokenEncrypted: string,
) {
  console.log("Starting bot:", shopName);

  if (runningBots.has(shopId)) return;

  const token = decrypt(tokenEncrypted);

  const bot = new Telegraf(token);

  registerBotHandlers(bot);

  await bot.launch();

  runningBots.set(shopId, bot);

  console.log(`🤖 Бот "${shopName}" успешно запущен`);
}

eventBus.on("shop.created", async ({ shopId, shopName, tokenEncrypted }) => {
  try {
    console.log("EVENT RECEIVED shop.created");

    await startShopBot(shopId, shopName, tokenEncrypted);
  } catch (err) {
    console.error(`Ошибка запуска бота ${shopName}`, err);
  }
});

export async function startAllShopBots() {
  const shops = await getAllShops();

  for (const shop of shops) {
    await startShopBot(shop.id, shop.name, shop.token_encrypted);
  }
}
