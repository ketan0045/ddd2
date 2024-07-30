import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const RestrictedRoute = () => {
    const token = localStorage.getItem('token');
    const isNotAuthenticated = token === null;
    return isNotAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default RestrictedRoute
