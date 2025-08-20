import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { IUser } from "../models/user";
import { mockUsers } from "../api/mockData";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      // For now, return mock data. Replace with actual API call when backend is ready
      // const response = await apiClient.get('/users');
      // return response.data;

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockUsers;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
