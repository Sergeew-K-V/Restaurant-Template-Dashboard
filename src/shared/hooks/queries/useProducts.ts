import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import { Product } from "../../models/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const response = await apiClient.get("/products");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
