import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("bot.db");

// создаём таблицу при старте
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tgId INTEGER UNIQUE,
      firstName TEXT,
      lastName TEXT,
      username TEXT,
      role TEXT DEFAULT 'user',
      isSubscribed INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});
