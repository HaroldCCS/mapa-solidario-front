import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useToken from 'hooks/useToken.hook';

const PrivateRoute = () => {
  const {token} = useToken()

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
