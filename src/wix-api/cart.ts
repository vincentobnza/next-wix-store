// cart.ts - Updated cart API functions

import { WixClient } from "@/lib/wix-client.base";
import { products } from "@wix/stores";
import { findVariant } from "@/lib/utils";
import { WIX_STORES_APP_ID } from "@/lib/constants";

type WixCartError = {
  details?: {
    applicationError?: {
      code?: string;
    };
  };
};

export async function getCart(wixClient: WixClient) {
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

export type AddToCartValues = {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
};

export async function addToCart(
  wixClient: WixClient,
  { product, selectedOptions, quantity }: AddToCartValues,
) {
  const selectedVariant = findVariant(product, selectedOptions);

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : { options: selectedOptions },
        },
        quantity,
      },
    ],
  });
}

export type UpdateCartItemQuantityValues = {
  lineItemId: string;
  newQuantity: number;
};

export async function updateCartItemQuantity(
  wixClient: WixClient,
  { lineItemId, newQuantity }: UpdateCartItemQuantityValues,
) {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    {
      _id: lineItemId,
      quantity: newQuantity,
    },
  ]);
}
