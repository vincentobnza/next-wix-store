"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

type ShoppingCartButtonProps = {
  initialData: currentCart.Cart | null;
};

export default function ShoppingCartButton(
  initialData: ShoppingCartButtonProps,
) {
  const cartQuery = useCart(initialData);
  const [sheetOpen, setSheetOpen] = useState(false);

  const totalQuantity =
    cartQuery.data?.lineItems?.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0,
    ) || 0;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSheetOpen(true)}
        className="relative"
      >
        <ShoppingCartIcon strokeWidth={3} />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-0 flex h-4 w-4 font-bold items-center justify-center rounded bg-primary text-[10px] text-primary-foreground">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        )}
      </Button>
    </div>
  );
}
