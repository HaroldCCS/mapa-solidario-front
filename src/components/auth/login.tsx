import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';
import useToken from 'hooks/useToken.hook';

const PrivateLoginRoute = () => {
	const {token} =  useToken()


  if (token) {
    return <Navigate to={ROUTES.PRINCIPAL_PAGE_ROUTE} />;
  }

  return <Outlet />;
};

export default PrivateLoginRoute;
