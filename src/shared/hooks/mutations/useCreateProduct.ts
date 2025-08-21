import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import { Product } from "../../models/product";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: Omit<Product, "id">) => {
      const response = await apiClient.post("/products", productData);
      return response.data;
    },
    onSuccess: (newProduct) => {
      // Optimistically update the products list
      queryClient.setQueryData<Product[]>(["products"], (oldData) => {
        if (oldData) {
          return [...oldData, newProduct];
        }
        return [newProduct];
      });

      // Invalidate and refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
    },
  });
};
