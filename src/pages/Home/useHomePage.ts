import { useEffect, useState } from 'react';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { IResSubscriptionPackage } from '../../models/response/IResGetSubscriptionPackage.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const masterDataAction = new MasterDataAction();

  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [listSubscription, setListSubscription] = useState<IResSubscriptionPackage[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setListSubscription(masterData?.listSubscriptionPackage?.data || []);
  }, [masterData.listSubscriptionPackage]);

  function onClickSubscribe(item: IResSubscriptionPackage) {
    alert('OKE');
  }

  function fetchData() {
    dispatch(masterDataAction.getSubscriptonPackage()).then();
  }

  return {
    listSubscription,
    onClickSubscribe,
  };
}
