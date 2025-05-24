/* eslint-disable @next/next/no-img-element */
import { products } from "@wix/stores";
import Link from "next/link";
import { Text } from "./typography/typography";
import { WixImage } from "./WixImage";
import { formatCurrency } from "@/lib/utils";

type ProductProps = {
  product: products.Product;
};

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;
  return (
    <Link href={`/products/${product.slug}`} className="w-full group bg-white">
      <div className="relative overflow-hidden">
        <WixImage
          width={700}
          height={700}
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1 py-5">
          <Text className="text-sm group-hover:underline line-clamp-1">
            {product.name}
          </Text>
          <h3 className="text-sm md:text-xl font-bold">
            {getFormattedPrice(product)}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const MIN_PRICE = product.priceRange?.minValue;
  const MAX_PRICE = product.priceRange?.maxValue;
  const CURRENCY = "USD";

  if (MIN_PRICE && MAX_PRICE && MIN_PRICE !== MAX_PRICE) {
    return `from ${formatCurrency(MIN_PRICE, CURRENCY)}`;
  } else {
    const price =
      product.priceData?.discountedPrice || product.priceData?.price;
    return price ? formatCurrency(price, CURRENCY) : "N/A";
  }
}
