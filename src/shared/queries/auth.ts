import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi, LoginRequest, RegisterRequest } from "../api/auth";
import { cookieUtils } from "../lib/cookies";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      // Cookie устанавливается сервером автоматически
      // Просто сохраняем данные пользователя в localStorage для UI
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      // Cookie устанавливается сервером автоматически
      // Просто сохраняем данные пользователя в localStorage для UI
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Удаляем cookie и данные пользователя
      cookieUtils.remove("dashboard-cookie");
      localStorage.removeItem("user");
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getProfile(),
    enabled: true, // Cookie проверяется на сервере
  });
};

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
