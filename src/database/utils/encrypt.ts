import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secret = process.env.TOKEN_SECRET!;

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}
