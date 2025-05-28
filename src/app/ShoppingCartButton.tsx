"use client";

import { Button } from "@/components/ui/button";
import { useCart, useUpdateCartItemQuantity } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { ShoppingCartIcon, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { WixImage } from "@/components/WixImage";

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

  const hasItems = totalQuantity > 0;

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSheetOpen(true)}
        className="relative"
      >
        <ShoppingCartIcon strokeWidth={2} className="h-5 w-5" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 font-bold items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {totalQuantity < 10 ? totalQuantity : "9+"}
          </span>
        )}
      </Button>
      <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent className="flex flex-col w-full sm:max-w-lg">
          <SheetHeader className="space-y-2 pb-4 border-b">
            <SheetTitle className="text-left">Your Shopping Cart</SheetTitle>
            <SheetDescription className="text-left">
              {hasItems
                ? `${totalQuantity} item${totalQuantity > 1 ? "s" : ""} in your cart`
                : "Your cart is empty"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {hasItems ? (
              <div className="space-y-4">
                {cartQuery.data?.lineItems?.map((item) => (
                  <ShoppingCartItem key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingCartIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Start shopping to add items to your cart
                </p>
                <SheetClose asChild>
                  <Button variant="outline">Continue Shopping</Button>
                </SheetClose>
              </div>
            )}
          </div>

          {hasItems && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">Subtotal</span>
                <span className="text-lg font-bold">
                  {/* @ts-expect-error - Wix cart types don't properly define formattedConvertedAmount property */}
                  {cartQuery.data?.subtotal?.formattedConvertedAmount}
                </span>
              </div>
              <p className="text-xs text-zinc-700">
                Shipping and taxes calculated at checkout
              </p>
              <Button
                className="w-full h-12 text-base font-semibold"
                disabled={!totalQuantity || cartQuery.isLoading}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

type ShoppingCartItemProps = {
  item: currentCart.LineItem;
};

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
  const updateQuantityMutation = useUpdateCartItemQuantity();
  const lineItemId = item._id;
  if (!lineItemId) return null;
  const slug = item.url?.split("/").pop();

  const quantityLimitReached =
    !!item.quantity &&
    !!item.availability?.quantityAvailable &&
    item.quantity >= item.availability.quantityAvailable;

  const handleQuantityUpdate = (newQuantity: number) => {
    try {
      updateQuantityMutation.mutate({
        lineItemId,
        newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="flex gap-4 p-4 border bg-card">
      <Link href={`/products/${slug}`} className="flex-shrink-0">
        <WixImage
          mediaIdentifier={item.image}
          width={80}
          height={80}
          alt={item.productName?.translated || "Product Image"}
          className="object-cover bg-muted"
        />
      </Link>

      <div className="flex-1 space-y-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <Link href={`/products/${slug}`}>
              <h4 className="text-sm line-clamp-2 hover:underline text-zinc-800">
                {item.productName?.translated || "Product Name"}
              </h4>
            </Link>

            {item.descriptionLines && item.descriptionLines.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {item.descriptionLines
                  ?.map(
                    (line) =>
                      line.colorInfo?.translated || line.plainText?.translated,
                  )
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-zinc-900 text-sm md:text-[16px] font-semibold">
            {item.price?.formattedConvertedAmount || "Price not available"}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleQuantityUpdate((item.quantity || 1) - 1)}
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={item.quantity === 1 || updateQuantityMutation.isPending}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="font-medium text-sm min-w-[2rem] text-center">
              {item.quantity || 0}
            </span>

            <Button
              onClick={() => handleQuantityUpdate((item.quantity || 0) + 1)}
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={
                quantityLimitReached || updateQuantityMutation.isPending
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
