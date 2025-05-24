"use client";
import { WixImage } from "@/components/WixImage";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";
import { Lens } from "@/components/ui/lens";

type ProductDetailsProps = {
  product: products.Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [hovering, setHovering] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr,
        }),
        {},
      ) || {},
  );

  const selectedVariant = findVariant(product, selectedOptions);
  // const inStock = checkInStock(product, selectedOptions);

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5 relative">
        <Lens hovering={hovering} setHovering={setHovering}>
          <WixImage
            mediaIdentifier={product.media?.mainMedia?.image?.url}
            alt={product.media?.mainMedia?.image?.altText}
            width={1000}
            height={1000}
            className="sticky top-0"
          />
        </Lens>
      </div>

      <div className="basis-3/5 space-y-5">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl uppercase">{product.name}</h1>
          <div className="text-md text-zinc-700 pb-5 border-b border-zinc-100">
            Brand: {""}
            {product.brand ? product.brand : "No brand available"}
          </div>

          <ProductPrice product={product} selectedVariant={selectedVariant} />
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
      </div>
    </div>
  );
}
