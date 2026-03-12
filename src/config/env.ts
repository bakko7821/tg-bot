import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is missing`);
  }

  return value;
}

export const env = {
  BOT_TOKEN: required("BOT_TOKEN"),

  DB_HOST: required("DB_HOST"),
  DB_PORT: Number(required("DB_PORT")),
  DB_USER: required("DB_USER"),
  DB_PASSWORD: required("DB_PASSWORD"),
  DB_NAME: required("DB_NAME"),
};
