import { cn } from "@/lib/utils";
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
    <div className="border-zinc-500 w-full py-5 flex items-center gap-2">
      {hasDiscount && (
        <span className="text-3xl font-bold text-rose-500 ">
          {priceData.formatted?.discountedPrice}
        </span>
      )}
      <span
        className={cn(
          hasDiscount && "line-through text-zinc-400 text-sm mt-1 ml-2",
        )}
      >
        {priceData.formatted?.price}
      </span>

      {product.discount && (
        <span className="mt-1 bg-red-50 text-red-500 px-2 font-bold text-sm">
          -{product.discount.value}%
        </span>
      )}
    </div>
  );
}
