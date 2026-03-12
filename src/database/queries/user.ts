import { TelegramUser, User } from "../../utils/types";
import { db } from "../db";

export async function getUserByTelegramId(telegramId: number) {
  const result = await db.query("SELECT * FROM users WHERE telegram_id = $1", [
    telegramId,
  ]);

  return result.rows[0];
}

export async function createUser(user: TelegramUser) {
  await db.query(
    `
    INSERT INTO users (
      telegram_id,
      first_name,
      last_name,
      username,
      language_code
    )
    VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (telegram_id)
    DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      username = EXCLUDED.username,
      language_code = EXCLUDED.language_code,
      updated_at = NOW()
    `,
    [
      user.id,
      user.first_name,
      user.last_name ?? null,
      user.username ?? null,
      user.language_code ?? null,
    ],
  );
}

export async function getUser(telegramId: number): Promise<User | null> {
  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE telegram_id = $1
    `,
    [telegramId],
  );

  return result.rows[0] ?? null;
}
