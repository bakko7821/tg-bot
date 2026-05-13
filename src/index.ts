import { bot } from "./bot";
import "./handlers/start";
import "./handlers/help";
import "./handlers/admin";

bot.launch();

console.log("Bot started...");
