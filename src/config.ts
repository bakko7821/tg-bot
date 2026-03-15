import dotenv from "dotenv";

dotenv.config();

export const BOTS =
  process.env.BOTS?.split(",").map((bot) => {
    const [name, token] = bot.split("|");

    return {
      name: name.trim(),
      token: token.trim(),
    };
  }) ?? [];
