import React, { useEffect, useState } from 'react';
import Service from 'services/app/survey-user.service';
import { useAppDispatch, useAppSelector } from "store";
import action from 'store/app/survey-user/survey-user.action';
import Interface from 'store/app/survey-user/survey-user.redux';


function useSurveyUser() {
  const service = new Service();
  const dispatch = useAppDispatch();

  const survey_user = useAppSelector(state => state?.survey_user?.survey_user);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!survey_user?.length) getAll()
  }, [survey_user])


  const getAll = async () => {
    setIsLoading(true);
    const response = await service.getMySurveys()
    if (response?.length) dispatch(action.set_many(response))
    setIsLoading(false);
  }

  const add = async (data: Partial<Interface>) => {
    await service.create(data as Interface)
    dispatch(action.add(data as Interface))
  }

  const remove = async (_id: string) => {
    await service.delete(_id)
    dispatch(action.delete_one(_id))
  }

  const update = async (data: Partial<Interface>) => {
    await service.edit(data as Interface)
    dispatch(action.update(data as Interface))
  }

  const saveMany = async (data: Partial<Interface>[]) => {
    setIsLoading(true);
    await service.saveMany(data)
    dispatch(action.delete_all())
    await getAll()
    setIsLoading(false);
  }


  return {
    survey_user,

    saveMany,
    getAll,

    add,
    remove,
    update,

    isLoadingos: isLoading
  };
}

export default useSurveyUser;