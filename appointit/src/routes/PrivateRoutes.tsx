import type { RootState } from "@/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoutes = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return(
        isAuthenticated ? <Outlet/> : <Navigate to={'/login'} replace />
    );
}

export default PrivateRoutes;