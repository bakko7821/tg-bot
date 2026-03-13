import { Telegraf } from "telegraf";
import { getAllShops } from "../database/queries/shops";
import { decrypt } from "../database/utils/decrypt";

type BotMap = Map<number, Telegraf>;

export const runningBots: BotMap = new Map();

export async function startShopBot(shopId: number, token: string) {
  const bot = new Telegraf(token);

  await bot.launch();

  runningBots.set(shopId, bot);

  console.log(`Shop bot ${shopId} started`);
}

export async function startAllShopBots() {
  const shops = await getAllShops();

  for (const shop of shops) {
    try {
      const token = decrypt(shop.token_encrypted);

      await startShopBot(shop.id, token);
    } catch (err) {
      console.error(`Failed to start bot ${shop.id}`, err);
    }
  }
}
