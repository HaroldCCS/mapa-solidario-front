import React from 'react';
import { useAppSelector } from "store";
import { PERMISSIONS_ARRAY } from "resources/permissions-constants";


function usePermissions() {
  const permissions = useAppSelector(state => state.user.permission.permissions);

  const hasPermission = (permission: PERMISSIONS_ARRAY) => {
    return permissions?.includes(permission)
  }

  return {
    hasPermission,
    permissions
  };
}

export default usePermissions;