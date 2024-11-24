import React from 'react';
import UserService from 'services/app/user.service';
import { useAppDispatch, useAppSelector } from "store";
import { Interface } from 'store/auth/user';
import userAction from 'store/auth/user/user.action';


function useUser() {
  const user = useAppSelector(state => state?.user?.user.user);

  const userService = new UserService();
  const dispatch = useAppDispatch();

  const update = async (data: Partial<Interface>) => {
    const response = await userService.edit(data)
    if (response?._id) dispatch(userAction.set(response as Interface))
  }

  return {
    user,
    update
  };
}

export default useUser;