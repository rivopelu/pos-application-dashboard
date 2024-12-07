import { useEffect, useState } from 'react';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { IResSubscriptionPackage } from '../../models/response/IResGetSubscriptionPackage.ts';
import { IResPayment } from '../../models/response/IResPayment.ts';
import { BaseResponse } from '../../models/response/ResponseModel.ts';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import ErrorService from '../../service/error.service.ts';
import { HttpService } from '../../service/http.service.ts';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const httpService = new HttpService();
  const errorService = new ErrorService();
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
    httpService
      .POST(ENDPOINT.CREATE_PAYMENT_SUBSCRIPTION(), { package_id: item.id })
      .then((res: BaseResponse<IResPayment>) => {
        window.open(res.data.response_data.redirect_url);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
      });
  }

  function fetchData() {
    dispatch(masterDataAction.getSubscriptonPackage()).then();
  }

  return {
    listSubscription,
    onClickSubscribe,
  };
}
