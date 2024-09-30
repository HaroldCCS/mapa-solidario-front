import React, { useEffect, useState } from 'react';
import UserService from 'services/app/user.service';
import { useAppDispatch, useAppSelector } from "store";
import allUsersAction from 'store/app/allUsers/allUsers.action';
import useRoles from './useRoles.hook';
import { Interface } from 'store/app/allUsers';


function useAllUsers() {
  const { roles } = useRoles();

  const [isLoading, setIsLoading] = useState(false);
  const service = new UserService();
  const dispatch = useAppDispatch();

  const all_users = useAppSelector(state => state?.all_users?.all_users);

  useEffect(() => {
    if (!all_users?.length) {
      getAll()
    }
  }, [all_users])


  const getAll = async() => {
    setIsLoading(true)

    service.getAll().then(response => {
      dispatch(allUsersAction.set_many(response))
      setIsLoading(false)
    })
  }

  const getUsersByRole = ({ name, _id }: { name?: string, _id?: string }, headquarter_id?: string) => {

    const role = roles.find(item => item.name === name || item._id === _id);
    if (!role) return [];

    const users = all_users?.filter(item => item.rol == role?._id)
    return users
  }

  const updateUserValidation = async (user: Partial<Interface>, status: 'pending' | 'approved' | 'rejected', reason: string) => {

    const response = await service.userValidation(user, status, reason)
    if (response?._id) dispatch(allUsersAction.update(response as Interface))
  }

  return {
    all_users,

    getAll,
    getUsersByRole,
    updateUserValidation,

    isLoading
  };
}

export default useAllUsers;