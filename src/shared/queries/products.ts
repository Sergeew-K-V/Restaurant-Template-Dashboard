import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { Product } from "../models/product";
import { mockProducts } from "../api/mockData";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      // For now, return mock data. Replace with actual API call when backend is ready
      // const response = await apiClient.get('/products');
      // return response.data;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockProducts;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
