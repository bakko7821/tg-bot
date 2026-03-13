import { eventBus } from "./eventBus";

export type ShopCreatedPayload = {
  shopId: number;
  shopName: string;
  tokenEncrypted: string;
};

export function emitShopCreated(payload: ShopCreatedPayload) {
  eventBus.emit("shop.created", payload);
}
