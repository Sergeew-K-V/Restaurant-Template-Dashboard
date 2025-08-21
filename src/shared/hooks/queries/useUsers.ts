import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/client";
import { IUser } from "../../models/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<IUser[]> => {
      const response = await apiClient.get("/users");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
