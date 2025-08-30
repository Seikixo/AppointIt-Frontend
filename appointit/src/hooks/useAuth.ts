import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser } from "@/services/auth";
import type { Credentials } from "@/types/types";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: Credentials) => loginUser(credentials),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["auth-user"], data.user);
      navigate("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth-user"] });
      navigate("/login");
    },
  });

  return {
    isLoading: loginMutation.isPending,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};
