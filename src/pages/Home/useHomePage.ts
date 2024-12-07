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
        showPaymentSnap(res.data.response_data.token);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
      });
  }

  function showPaymentSnap(token: string) {
    // eslint-disable-next-line @typescrip  t-eslint/ban-ts-comment
    // @ts-ignore
    snap.pay(token, {
      onSuccess: function (result: any) {
        console.log('success');
        console.log(result);
      },
      onPending: function (result: any) {
        console.log('pending');
        console.log(result);
      },
      onError: function (result: any) {
        console.log('error');
        console.log(result);
      },
      onClose: function () {
        console.log('customer closed the popup without finishing the payment');
      },
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
