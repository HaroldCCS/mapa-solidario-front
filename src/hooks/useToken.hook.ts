import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { ROUTES } from 'resources/routes-constants';
import { useAppSelector,useAppDispatch } from "store";

import tokenAction from 'store/auth/token/token.action';
import rolAction from 'store/app/rol/rol.action';
import userAction from 'store/auth/user/user.action';
import permissionAction from 'store/auth/permissions/permission.action';
import allUsersAction from 'store/app/allUsers/allUsers.action';

function useToken() {
  const token = useAppSelector(state => state?.user?.token?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(tokenAction.drop());
    dispatch(userAction.delete_all());
    dispatch(rolAction.delete_all());
    dispatch(permissionAction.delete_all());
    dispatch(allUsersAction.delete_all());
    navigate(ROUTES.LOGIN);
  }


  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convertir a segundos
      if (decodedToken && decodedToken?.exp &&  decodedToken?.exp < currentTime) logout()
    }
  }, [token]);

  return {
    logout,
    token
  };
}

export default useToken;