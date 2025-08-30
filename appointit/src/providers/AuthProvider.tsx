import { useFetchUser } from "@/hooks/useFetchUser";
import type { AuthContextValue } from "@/types/types";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { toast } from "sonner";

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  token: null,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { user, isLoading, error } = useFetchUser();

  useEffect(() => {
    if (error) {
      toast("Authentication error occurred");
      setToken(null);
      localStorage.removeItem("token");
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading,
        user: user,
        token: token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
