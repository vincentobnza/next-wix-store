import { products } from "@wix/stores";

type ProductPriceProps = {
  product: products.Product;
  selectedVariant: products.Variant | null;
};

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData || product.priceData;

  if (!priceData) return null;
  const hasDiscount = priceData?.discountedPrice !== priceData?.price;

  return (
    <div className="border-zinc-500 w-full py-4 flex items-center gap-2">
      <span className="text-3xl font-bold text-zinc-900 ">
        {hasDiscount
          ? priceData?.formatted?.discountedPrice
          : priceData?.formatted?.price}
      </span>
      {hasDiscount && (
        <span className="line-through text-zinc-400 text-sm mt-1 ml-2">
          {priceData.formatted?.price}
        </span>
      )}

      {hasDiscount && product.discount && (
        <span className="mt-1 bg-zinc-100 text-zinc-800 px-2 font-bold text-sm">
          -{product.discount.value}%
        </span>
      )}
    </div>
  );
}
