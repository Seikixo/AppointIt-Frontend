import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

import Login from "@/pages/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

import { lazy, Suspense } from "react";
import Register from "@/pages/auth/Register";

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Organization = lazy(() => import("@/pages/organization/Organization"));

function DefaultRedirect() {
  const token = localStorage.getItem("token");
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

const AppRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<DefaultRedirect />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/organization"
            element={
              <PrivateRoutes>
                <Organization />
              </PrivateRoutes>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
