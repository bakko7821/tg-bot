import { bot } from "./bot";
import "./handlers/start";
import "./handlers/help";

bot.launch();

console.log("Bot started...");
