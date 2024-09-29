import React, { useEffect, useState } from 'react';
import UserService from 'services/app/user.service';
import { useAppDispatch, useAppSelector } from "store";
import allUsersAction from 'store/app/allUsers/allUsers.action';
import useRoles from './useRoles.hook';


function useAllUsers() {
  const { roles } = useRoles();

  const [isLoading, setIsLoading] = useState(false);
  const userService = new UserService();
  const dispatch = useAppDispatch();

  const all_users = useAppSelector(state => state?.all_users?.all_users);

  useEffect(() => {
    if (!all_users?.length) {
      getAll()
    }
  }, [all_users])


  const getAll = async() => {
    setIsLoading(true)

    userService.getAll().then(response => {
      dispatch(allUsersAction.set_many(response))
      setIsLoading(false)
    })
  }

  const getUsersByRole = ({ name, _id }: { name?: string, _id?: string }, headquarter_id?: string) => {

    const role = roles.find(item => item.name === name || item._id === _id);
    if (!role) return [];

    let users = all_users?.filter(item => item.roles?.includes(role?._id))
    if (headquarter_id) users = users?.filter(item => item.headquarters_id?.some(headquarter => headquarter === headquarter_id))
    return users
  }

  return {
    isLoading,
    getAll,
    getUsersByRole,
    all_users
  };
}

export default useAllUsers;