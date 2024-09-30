import React, { useEffect, useState } from 'react';
import NotificationService from 'services/app/notification.service';
import { useAppDispatch, useAppSelector } from "store";
import notificationAction from 'store/app/notification/notification.action';
import Interface from 'store/app/notification/notification.redux';


function useNotifications() {
  const service = new NotificationService();
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(state => state?.notifications?.notifications);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!notifications?.length) getAllNotifications()
  }, [notifications])


  const getAllNotifications = async () => {
    setIsLoading(true);
    const response = await service.getMyNotifications()
    if (response?.length) dispatch(notificationAction.set_many(response))
    setIsLoading(false);
  }

  const addNotification = async (data: Partial<Interface>) => {
    await service.create(data as Interface)
    dispatch(notificationAction.add(data as Interface))
  }

  const removeNotification = async (_id: string) => {
    await service.delete(_id)
    dispatch(notificationAction.delete_one(_id))
  }

  const updateNotification = async (data: Partial<Interface>) => {
    await service.edit(data as Interface)
    dispatch(notificationAction.update(data as Interface))
  }


  return {
    notifications,

    getAllNotifications,
    addNotification,
    removeNotification,
    updateNotification,

    isLoadingNotificationos: isLoading
  };
}

export default useNotifications;