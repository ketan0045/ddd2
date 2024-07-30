import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  }

export default ProtectedRoute
