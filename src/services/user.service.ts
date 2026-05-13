import { userRepository } from "../repositories/user.repository";

export const userService = {
  register(user: any) {
    return userRepository.upsertUser(user);
  },

  setRole(tgId: number, role: string) {
    return userRepository.setRole(tgId, role);
  },

  subscribe(tgId: number, value: boolean) {
    return userRepository.setSubscribe(tgId, value);
  },
};
