import { get } from "../db/sqlite";
import { OWNERS } from "../config/owners";

export async function isOwner(tgId: number): Promise<boolean> {
  if (OWNERS.includes(tgId)) return true;

  const user = await get(`SELECT role FROM users WHERE tgId = ?`, [tgId]);

  return user?.role === "owner";
}

export async function isUser(tgId: number): Promise<boolean> {
  const user = await get(`SELECT role FROM users WHERE tgId = ?`, [tgId]);

  return !!user;
}
