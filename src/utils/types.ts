export const USER_ROLES = {
  USER: "user",
  VIP: "vip",
  ADMIN: "admin",
  OWNER: "owner",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const roleLevel: Record<UserRole, number> = {
  [USER_ROLES.USER]: 1,
  [USER_ROLES.VIP]: 2,
  [USER_ROLES.ADMIN]: 3,
  [USER_ROLES.OWNER]: 4,
};

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
