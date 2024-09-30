import React, { useEffect, useState } from 'react';
import EventService from 'services/app/event.service';
import { useAppDispatch, useAppSelector } from "store";
import eventAction from 'store/app/event/event.action';
import Interface from 'store/app/event/event.redux';


function useEvents() {
  const service = new EventService();
  const dispatch = useAppDispatch();

  const events = useAppSelector(state => state?.events?.events);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!events?.length) getAllEvents()
  }, [events])


  const getAllEvents = async () => {
    setIsLoading(true);
    const response = await service.getAll()
    if (response?.length) dispatch(eventAction.set_many(response))
    setIsLoading(false);
  }

  const addEvent = async (data: Partial<Interface>) => {
    await service.create(data as Interface)
    dispatch(eventAction.add(data as Interface))
  }

  const removeEvent = async (_id: string) => {
    await service.delete(_id)
    dispatch(eventAction.delete_one(_id))
  }

  const updateEvent = async (data: Partial<Interface>) => {
    await service.edit(data as Interface)
    dispatch(eventAction.update(data as Interface))
  }


  return {
    events,

    getAllEvents,
    addEvent,
    removeEvent,
    updateEvent,

    isLoadingEventos: isLoading
  };
}

export default useEvents;