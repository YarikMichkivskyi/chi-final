import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAllowed }: { children: React.ReactNode, isAllowed:boolean }) => {
    return isAllowed ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;