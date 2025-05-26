import { Tokens } from "@wix/sdk";
import { getWixClient } from "./wix-client.base";
import { WIX_SESSION_COOKIE } from "./constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const getWixServerClient = cache(async () => {
  let tokens: Tokens | undefined;
  try {
    const cookiesStore = await cookies();
    tokens = JSON.parse(cookiesStore.get(WIX_SESSION_COOKIE)?.value || "{}");
  } catch (_error) {}

  return getWixClient(tokens);
});
export const wixClientServer = await getWixServerClient();
