import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, loginUser, logoutUser } from "@/services/auth";
import type { Credentials } from "@/types/types";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: Credentials) => loginUser(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      queryClient.setQueryData(["auth-user"], data.user);
      navigate("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["auth-user"] });
      navigate("/login");
    },
  });

  return {
    user,
    isLoading: isLoading || loginMutation.isPending,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};
