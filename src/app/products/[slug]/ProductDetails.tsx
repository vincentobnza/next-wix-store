"use client";
import { WixImage } from "@/components/WixImage";
import { products } from "@wix/stores";

type ProductDetailsProps = {
  product: products.Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5">
        <WixImage
          mediaIdentifier={product.media?.mainMedia?.image?.url}
          alt={product.media?.mainMedia?.image?.altText}
          width={1000}
          height={1000}
          className="sticky top-0 "
        />
      </div>

      <div className="basis-3/5 space-y-5">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl">{product.name}</h1>

          {product.brand && (
            <div className="text-sm text-zinc-500">{product.brand}</div>
          )}

          {product.description && (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
        </div>
      </div>
    </div>
  );
}
