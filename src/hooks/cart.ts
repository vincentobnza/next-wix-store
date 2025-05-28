import { wixClientBrowser } from "@/lib/wix-client-browser";
import {
  addToCart,
  AddToCartValues,
  getCart,
  UpdateCartItemQuantityValues,
  updateCartItemQuantity,
} from "@/wix-api/cart";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryKey,
  MutationKey,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { toast } from "sonner";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(wixClientBrowser),
    initialData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
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

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  const mutationKey: MutationKey = ["updateCartItemQuantity"];

  return useMutation({
    mutationKey,
    mutationFn: (values: UpdateCartItemQuantityValues) =>
      updateCartItemQuantity(wixClientBrowser, values),

    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const prevState = queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldCart) => {
        if (!oldCart || !oldCart.lineItems) {
          return oldCart;
        }
        return {
          ...oldCart,
          lineItems: oldCart.lineItems.map((lineItem) =>
            lineItem._id === productId
              ? {
                  ...lineItem,
                  quantity: newQuantity,
                }
              : lineItem,
          ),
        };
      });

      return { prevState };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      toast.success("Cart updated successfully");
    },
    onError: (error, variables, context) => {
      if (context?.prevState) {
        queryClient.setQueryData(queryKey, context.prevState);
      }
      console.error("Error updating cart item quantity:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while updating item quantity",
      );
    },
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey }) === 1) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}
