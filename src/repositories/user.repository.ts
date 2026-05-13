import { run } from "../db/sqlite";

export const userRepository = {
  async upsertUser(user: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  }) {
    // insert если нет
    await run(
      `
      INSERT OR IGNORE INTO users (tgId, firstName, lastName, username)
      VALUES (?, ?, ?, ?)
      `,
      [user.id, user.first_name, user.last_name ?? null, user.username ?? null],
    );

    // update всегда актуализируем
    await run(
      `
      UPDATE users
      SET firstName = ?, lastName = ?, username = ?
      WHERE tgId = ?
      `,
      [user.first_name, user.last_name ?? null, user.username ?? null, user.id],
    );
  },

  async setRole(tgId: number, role: string) {
    await run(`UPDATE users SET role = ? WHERE tgId = ?`, [role, tgId]);
  },

  async setSubscribe(tgId: number, value: boolean) {
    await run(`UPDATE users SET isSubscribed = ? WHERE tgId = ?`, [
      value ? 1 : 0,
      tgId,
    ]);
  },
};
