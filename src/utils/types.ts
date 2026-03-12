export type UserRole = "owner" | "admin" | "vip" | "user";

export interface User {
  telegram_id: number;

  first_name: string | null;
  last_name: string | null;
  username: string | null;
  language_code: string | null;

  phone_number: string | null;

  role: UserRole;

  created_at: Date;
  updated_at: Date;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}
