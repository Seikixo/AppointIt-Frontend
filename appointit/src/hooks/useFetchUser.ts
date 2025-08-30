import { getUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  const token = localStorage.getItem("token");

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
    enabled: !!token,
  });

  return {
    error,
    user,
    isFetching,
    isLoading,
  };
};
