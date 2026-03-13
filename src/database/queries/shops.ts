import { db } from "../db";

export type Shop = {
  id: number;
  owner_id: number;
  name: string;
  token_encrypted: string;
  created_at: Date;
  updated_at: Date;
};

export async function createShop(
  ownerId: number,
  name: string,
  encryptedToken: string,
): Promise<Shop> {
  const result = await db.query(
    `
    INSERT INTO shops (owner_id, name, token_encrypted)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [ownerId, name, encryptedToken],
  );

  return result.rows[0];
}

export async function getShopById(id: number): Promise<Shop | null> {
  const result = await db.query(
    `
    SELECT * FROM shops
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function getShopsByOwner(ownerId: number): Promise<Shop[]> {
  const result = await db.query(
    `
    SELECT * FROM shops
    WHERE owner_id = $1
    ORDER BY created_at DESC
    `,
    [ownerId],
  );

  return result.rows;
}

export async function deleteShop(id: number) {
  await db.query(
    `
    DELETE FROM shops
    WHERE id = $1
    `,
    [id],
  );
}

export async function getShopTokenEncrypted(
  id: number,
): Promise<string | null> {
  const result = await db.query(
    `
    SELECT token_encrypted
    FROM shops
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0]?.token_encrypted ?? null;
}

export async function getAllShops() {
  const result = await db.query(`
    SELECT id, token_encrypted
    FROM shops
  `);

  return result.rows;
}
