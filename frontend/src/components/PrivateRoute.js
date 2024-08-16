import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
   const token = useSelector(state => state.auth.token);
   const isAuthenticated = !!token;
   return isAuthenticated ? children : <Navigate to="/تسجيل-دخول" />;
};

export default PrivateRoute;
