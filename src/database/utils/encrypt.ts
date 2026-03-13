import crypto from "crypto";

const algorithm = "aes-256-ctr";

const secret = Buffer.from(process.env.TOKEN_SECRET!, "hex");

export function encrypt(text: string) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secret, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}
