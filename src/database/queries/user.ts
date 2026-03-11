import { db } from "../db";

export async function getUserByTelegramId(telegramId: number) {
  const result = await db.query("SELECT * FROM users WHERE telegram_id = $1", [
    telegramId,
  ]);

  return result.rows[0];
}
