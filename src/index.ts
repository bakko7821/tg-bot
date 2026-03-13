import { bot } from "./bot";

import "./commands/help";
import "./commands/owner/new_shop";
import "./commands/owner/own";
import "./commands/start";

import "./handlers/message";

import { startAllShopBots } from "./bot/botManager";
import { initDatabase } from "./database/init";

async function start() {
  await initDatabase();

  await bot.launch();
  console.log("Main bot started 🤖");

  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET not set");
  }

  await startAllShopBots();
}

start();
