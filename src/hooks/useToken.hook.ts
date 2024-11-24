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
import notificationAction from 'store/app/notification/notification.action';
import headquarterAction from 'store/app/headquarter/headquarter.action';
import eventAction from 'store/app/event/event.action';
import surveyUserAction from 'store/app/survey-user/survey-user.action';
import surveyPropertieAction from 'store/app/survey-propertie/survey-propertie.action';

function useToken() {
  const token = useAppSelector(state => state?.user?.token?.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(tokenAction.drop());
    dispatch(userAction.delete_all());
    dispatch(permissionAction.delete_all());
    dispatch(rolAction.delete_all());
    dispatch(allUsersAction.delete_all());
    dispatch(notificationAction.delete_all());
    dispatch(headquarterAction.delete_all());
    dispatch(eventAction.delete_all());
    dispatch(surveyUserAction.delete_all());
    dispatch(surveyPropertieAction.delete_all());
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