import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
    return(
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login/>}/>
            </Route>

            <Route element={<MainLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}

export default AppRoutes;

