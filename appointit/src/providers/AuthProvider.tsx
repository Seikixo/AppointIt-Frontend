import { useFetchUser } from "@/hooks/useFetchUser";
import type { AuthContextValue } from "@/types/types";
import { createContext, useEffect, type PropsWithChildren } from "react";
import { toast } from "sonner";

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const { user, isLoading, error } = useFetchUser();

  useEffect(() => {
    if (error) {
      toast("Authentication error occurred");
      localStorage.removeItem("token");
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
