import { bot } from "./bot";

import "./commands/help";
import "./commands/owner/own";
import "./commands/owner/new_shop";
import "./commands/start";

import "./handlers/message";

import { initDatabase } from "./database/init";
import { startAllShopBots } from "./bot/botManager";

async function start() {
  await initDatabase();

  await bot.launch();
  console.log("Main bot started 🤖");

  await startAllShopBots();
  console.log("All shop bots started 🏪");
}

start();
