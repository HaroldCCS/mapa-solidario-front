import React, { useEffect, useState } from 'react';
import HeadquarterService from 'services/app/headquarter.service';
import { useAppDispatch, useAppSelector } from "store";
import headquarterAction from 'store/app/headquarter/headquarter.action';
import Interface from 'store/app/headquarter/headquarter.redux';


function useHeadquarters() {
  const service = new HeadquarterService();
  const dispatch = useAppDispatch();

  const headquarters = useAppSelector(state => state?.headquarters?.headquarters);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!headquarters?.length) getAllHeadquarters()
  }, [headquarters])


  const getAllHeadquarters = async () => {
    setIsLoading(true);
    const response = await service.getAll()
    if (response?.length) dispatch(headquarterAction.set_many(response))
    setIsLoading(false);
  }

  const addHeadquarter = async (data: Partial<Interface>) => {
    const response =await service.create(data as Interface)
    if (response?._id) dispatch(headquarterAction.add(data as Interface))
  }

  const removeHeadquarter = async (_id: string) => {
    await service.delete(_id)
    dispatch(headquarterAction.delete_one(_id))
  }

  const updateHeadquarter = async (data: Partial<Interface>) => {
    const response = await service.edit(data as Interface)
    if (response?._id) dispatch(headquarterAction.update(response as Interface))
  }


  return {
    headquarters,

    getAllHeadquarters,
    addHeadquarter,
    removeHeadquarter,
    updateHeadquarter,

    isLoadingHeadquarteros: isLoading
  };
}

export default useHeadquarters;