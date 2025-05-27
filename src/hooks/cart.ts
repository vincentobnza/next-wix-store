import { wixClientBrowser } from "@/lib/wix-client-browser";
import { addToCart, AddToCartValues, getCart } from "@/wix-api/cart";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(wixClientBrowser),
    initialData,
  });
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixClientBrowser, values),
    onSuccess: (data) => {
      toast.success("Item added to cart");
      queryClient.cancelQueries({
        queryKey,
      });
      queryClient.setQueryData(queryKey, data.cart);
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while adding item to cart");
      }
    },
  });
}
