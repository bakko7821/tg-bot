import { db } from "./db";

export async function initDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      telegram_id BIGINT UNIQUE NOT NULL,
      role TEXT DEFAULT 'user'
    );
  `);

  console.log("Database initialized");
}
