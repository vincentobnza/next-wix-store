/* eslint-disable @next/next/no-img-element */
import { products } from "@wix/stores";
import Link from "next/link";
import { Text } from "./typography/typography";
import { WixImage } from "./WixImage";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

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

        <AddToCart />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1 py-5">
          <Text className="text-xs group-hover:underline line-clamp-1 font-medium">
            {product.name}
          </Text>
          <div className="flex items-center gap-3">
            <h3 className="text-sm md:text-lg font-bold">
              {getFormattedPrice(product)}
            </h3>
          </div>
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
    return `${formatCurrency(MIN_PRICE, CURRENCY)}`;
  } else {
    const price =
      product.priceData?.discountedPrice || product.priceData?.price;
    return price ? formatCurrency(price, CURRENCY) : "N/A";
  }
}

function AddToCart() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute grid place-items-center bottom-2 left-1/2 transform -translate-x-1/2 text-black duration-300 transition rounded-full bg-white/20 z-10 size-8 hover:scale-110">
            <Plus className="size-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to Cart</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
