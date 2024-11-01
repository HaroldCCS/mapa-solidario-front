import React from 'react';
import { useAppSelector } from "store";


function useUser() {
  const user = useAppSelector(state => state?.user?.user.user);

  return {
    user
  };
}

export default useUser;