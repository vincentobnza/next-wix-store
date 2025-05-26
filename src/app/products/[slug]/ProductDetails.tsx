"use client";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";
import ProductMedia from "./ProductMedia";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import AddToCartButton from "@/components/AddtoCartButton";

type ProductDetailsProps = {
  product: products.Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
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
  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeds =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );

    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <div className="basis-2/5 relative">
        <ProductMedia
          media={
            !!selectedOptionsMedia?.length
              ? selectedOptionsMedia
              : product.media?.items
          }
        />
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

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm">
              Quantity
            </Label>

            <div className="flex items-center gap-5">
              <Input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                max={availableQuantity || 999}
                className="w-16 font-bold"
                disabled={!inStock}
              />

              {!!availableQuantity &&
                (availableQuantityExceeds || availableQuantity < 10) && (
                  <span className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <InfoIcon className="inline mr-1 size-3" />
                    Only {availableQuantity} left in stock
                  </span>
                )}
            </div>

            {/* {inStock ? (
              <AddToCartButton
                product={product}
                selectedOptions={selectedOptions}
                quantity={quantity}
              />
            ) : (
              <div className="text-rose-600 font-semibold py-2">
                Out of Stock
              </div>
            )} */}
          </div>

          {!!product.additionalInfoSections?.length && (
            <div className="w-full space-y-6 text-md">
              <span className="flex pt-8 items-center gap-2 mb-5">
                <InfoIcon className="inline mr-1 size-4" />
                Additional Information
              </span>

              <Accordion type="multiple" className="w-full space-y-4">
                {product.additionalInfoSections.map((section) => (
                  <AccordionItem
                    value={section.title || ""}
                    key={section.title}
                  >
                    <AccordionTrigger>{section.title}</AccordionTrigger>

                    <AccordionContent>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section.description || "",
                        }}
                        className="prose text-sm text-zinc-700"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
