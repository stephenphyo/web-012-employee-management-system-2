/*** Router Imports ***/
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    // if (!isAuth && !isLoading) return (<Navigate to='/login' replace />);
    return (<Outlet />);
}

export default ProtectedRoute;