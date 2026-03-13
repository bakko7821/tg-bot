import crypto from "crypto";

const algorithm = "aes-256-ctr";

const secret = Buffer.from(process.env.TOKEN_SECRET!, "hex");

export function decrypt(hash: string) {
  const [ivHex, encryptedHex] = hash.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, secret, iv);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString();
}
