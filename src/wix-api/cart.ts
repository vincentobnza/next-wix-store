import { getWixClient } from "@/lib/wix-client.base";

type WixCartError = {
  details?: {
    applicationError?: {
      code?: string;
    };
  };
};

export async function getCart() {
  const wixClient = await getWixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    const err = error as WixCartError;
    if (err.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}
