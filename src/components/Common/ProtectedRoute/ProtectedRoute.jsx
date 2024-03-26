import React from "react";

/*** Router Imports ***/
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({isAuth, isLoading}) {
    if (!isAuth && !isLoading) return (<Navigate to='/login' replace />);
    return (<Outlet />);
}

export default ProtectedRoute;