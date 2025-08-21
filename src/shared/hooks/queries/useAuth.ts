import { useProfile } from "./useProfile";

// Хук для проверки аутентификации
export const useAuth = () => {
  const profileQuery = useProfile();

  return {
    user: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isAuthenticated: !!profileQuery.data,
    error: profileQuery.error,
  };
};
