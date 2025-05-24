"use client";

import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";

type ProductOptionsProps = {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
};

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-5">
      {product.productOptions?.map((option) => (
        <fieldset
          key={option.name}
          className="flex items-center justify-start gap-4"
        >
          <legend>
            <Label asChild className="text-sm font-semibold">
              <span>{option.name}</span>
            </Label>
          </legend>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                <input
                  type="radio"
                  id={choice.description}
                  name={option.name}
                  value={choice.description}
                  checked={
                    selectedOptions[option.name || ""] === choice.description
                  }
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    })
                  }
                  className="peer hidden"
                />
                <Label
                  htmlFor={choice.description}
                  className={cn(
                    "flex items-center justify-center min-w-14 gap-1.5 border-2 rounded-md border-zinc-200 cursor-pointer p-2 peer-checked:border-rose-400",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    }) && "opacity-50 cursor-not-allowed",
                  )}
                >
                  {option.optionType === products.OptionType.color && (
                    <span
                      className="size-3.5 rounded-full border"
                      style={{
                        backgroundColor: choice.value,
                      }}
                    />
                  )}
                  <span> {choice.description}</span>
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
