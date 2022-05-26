import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ROUTES from '../../config/routes';

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} />;
  }
  return <>{children}</>;
}
