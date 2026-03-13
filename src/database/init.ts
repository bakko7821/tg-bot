import { Pool } from "pg";
import { env } from "../config/env";
import { db } from "./db";

export async function initDatabase() {
  // 1. подключаемся к системной базе postgres
  const adminPool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: "postgres",
  });

  // 2. проверяем существует ли база
  const res = await adminPool.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [env.DB_NAME],
  );

  // 3. если нет — создаём
  if (res.rowCount === 0) {
    console.log(`Creating database ${env.DB_NAME}...`);
    await adminPool.query(`CREATE DATABASE ${env.DB_NAME}`);
  }

  await adminPool.end();

  // 4. создаём таблицы
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id BIGINT PRIMARY KEY,

      first_name TEXT,
      last_name TEXT,
      username TEXT,
      language_code TEXT,

      phone_number TEXT,

      role TEXT DEFAULT 'user'
        CHECK (role IN ('owner','admin','vip','user')),

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS shops (
      id BIGSERIAL PRIMARY KEY,

      owner_id BIGINT NOT NULL,

      name TEXT NOT NULL,

      token_encrypted TEXT NOT NULL,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Database initialized");
}
