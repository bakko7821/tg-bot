import { bot } from "./bot";

import "./commands/help";
import "./commands/own";
import "./commands/start";
import { initDatabase } from "./database/init";
import "./handlers/message";

async function start() {
  await initDatabase();

  await bot.launch();
  console.log("Bot started 🤖");
}

start();
