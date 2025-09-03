import { Loader } from "@/components/ui/loader";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex flex-row gap-2 w-full h-full justify-center items-center">
        <Loader /> <p>Loading...</p>
      </div>
    );
  }

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
