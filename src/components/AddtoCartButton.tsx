import { products } from "@wix/stores";
import { ButtonProps } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";
import { ShoppingCartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = ButtonProps & {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
};

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();

  const handleAddToCart = async () => {
    await mutation.mutate({
      product,
      selectedOptions,
      quantity,
    });
  };
  return (
    <LoadingButton
      variant={"outline"}
      className={cn("flex items-center gap-2 ", className)}
      isLoading={mutation.isPending}
      onClick={handleAddToCart}
      {...props}
    >
      <ShoppingCartIcon />
      Add to Cart
    </LoadingButton>
  );
}
