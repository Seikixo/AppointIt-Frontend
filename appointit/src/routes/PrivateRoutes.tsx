import { selectIsAuthenticated } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoutes;
