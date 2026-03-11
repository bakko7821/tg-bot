import { bot } from "./bot";

import "./commands/start";
import "./commands/own";
import "./handlers/message";
import { initDatabase } from "./database/init";

async function start() {
  await initDatabase();

  await bot.launch();
  console.log("Bot started 🤖");
}

start();
