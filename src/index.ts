import { bot } from "./bot";

import "./commands/start";
import "./handlers/message";

async function start() {
  await bot.launch();

  console.log("🤖 Bot started");
}

start();
