import { getWixClient } from "@/lib/wix-client.base";

type ProductSort = "last_updated" | "price_asc" | "price_desc";

type QueryProductsFilter = {
  collectionIds?: string[] | string;
  sort?: ProductSort;
};

export async function QueryProducts({
  collectionIds,
  sort = "last_updated",
}: QueryProductsFilter) {
  const wixClient = getWixClient();

  let query = wixClient.products.queryProducts();

  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : [];

  if (collectionIdsArray.length > 0) {
    query = query.hasSome("collectionIds", collectionIdsArray);
  }

  switch (sort) {
    case "price_asc":
      query = query.ascending("price");
      break;

    case "price_desc":
      query = query.descending("price");
      break;

    case "last_updated":
      query = query.descending("lastUpdated");
      break;
  }

  return query.find();
}
