import { Telegraf } from "telegraf";
import { createBot } from "./bot/createBot";
import { BOTS } from "./config";

console.log("START FUNCTION CALLED");

const runningBots = new Map<string, Telegraf>();

for (const botConfig of BOTS) {
  startBot(botConfig);
}

async function startBot(botConfig: { name: string; token: string }) {
  try {
    const bot = createBot(botConfig.token);
    console.log("Bot created");

    const me = await bot.telegram.getMe();
    console.log("Connected:", me.username);

    await bot.telegram.deleteWebhook();
    console.log("Bot deleteWebhook");

    await bot.launch();
    console.log("Bot launching");

    runningBots.set(botConfig.token, bot);

    console.log(`🤖 Bot "${botConfig.name}" started`);
  } catch (err) {
    console.error(`❌ Bot "${botConfig.name}" failed`, err);
  }
}
