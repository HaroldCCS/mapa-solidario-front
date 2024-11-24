import React, { useEffect, useState } from 'react';
import Service from 'services/app/survey-propertie.service';
import { useAppDispatch, useAppSelector } from "store";
import action from 'store/app/survey-propertie/survey-propertie.action';
import Interface from 'store/app/survey-propertie/survey-propertie.redux';


function useSurveyProperties({ noGet }: { noGet?: boolean }) {
  const service = new Service();
  const dispatch = useAppDispatch();

  const survey_properties = useAppSelector(state => state?.survey_properties?.survey_properties);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (noGet) return;
    if (!survey_properties?.length) getAll()
  }, [survey_properties])


  const getAll = async () => {
    setIsLoading(true);
    const response = await service.getAll()
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


  return {
    survey_properties,

    getAll,
    add,
    remove,
    update,

    isLoadingos: isLoading
  };
}

export default useSurveyProperties;