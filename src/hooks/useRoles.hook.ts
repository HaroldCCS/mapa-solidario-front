import React, { useEffect } from 'react';
import RolService from 'services/app/rol.service';
import { useAppDispatch, useAppSelector } from "store";
import rolAction from 'store/app/rol/rol.action';


function useRoles() {
  const rolService = new RolService();
	const dispatch = useAppDispatch();

  const roles = useAppSelector(state => state?.roles?.roles);

  useEffect(() => {
    if (!roles?.length) {
      rolService.getAll().then(response => {
				dispatch(rolAction.set_many(response))
      })
    }
  }, [roles])


  return {
    roles
  };
}

export default useRoles;