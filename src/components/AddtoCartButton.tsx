import { products } from "@wix/stores";
import { Button, ButtonProps } from "./ui/button";
import { addToCart } from "@/wix-api/cart";

type AddToCartButtonProps = ButtonProps & {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
};

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  ...props
}: AddToCartButtonProps) {
  const handleAddToCart = async () => {
    await addToCart({
      product,
      selectedOptions,
      quantity,
    });
  };
  return (
    <Button onClick={handleAddToCart} {...props}>
      Add to Cart
    </Button>
  );
}
