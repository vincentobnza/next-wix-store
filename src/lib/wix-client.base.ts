import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { env } from "./env";
import { products, collections } from "@wix/stores";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";

export function getWixClient(tokens: Tokens | undefined) {
  return createClient({
    modules: {
      products,
      collections,
      files,
      members,
      redirects,
      reviews,
      backInStockNotifications,
      checkout,
      currentCart,
      orders,
      recommendations,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens,
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;
