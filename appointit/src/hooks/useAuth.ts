import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser, registerUser } from "@/services/auth";
import type { CreateUser, Credentials } from "@/types/types";
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
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      queryClient.clear();
      navigate("/login");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (createUser: CreateUser) => registerUser(createUser),
    onSuccess: () => {
      navigate("/login");
    },
  });

  return {
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};
