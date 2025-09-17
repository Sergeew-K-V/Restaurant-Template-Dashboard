import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../api/auth";

export const useProfile = ({
  enabled,
  id,
}: {
  enabled: boolean;
  id: string;
}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getProfile(id),
    enabled,
  });
};
