import fs from "fs";
import { onlyOwner } from "../middleware/onlyOwner";
import { bot } from "../bot";

bot.command(
  "get_db",
  onlyOwner(async (ctx: any) => {
    const tempFile = "backup.db";

    fs.copyFileSync("bot.db", tempFile);

    await ctx.replyWithDocument({
      source: tempFile,
      filename: "database.db",
    });
  }),
);
