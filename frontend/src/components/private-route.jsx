import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
