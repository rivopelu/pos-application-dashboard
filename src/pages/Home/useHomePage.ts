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
import { AccountActions } from '../../redux/actions/account.actions.ts';
import { IAccountSlice } from '../../redux/reducers/account.slice.ts';
import { IResGetMe } from '../../models/response/IResGetMe.ts';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const httpService = new HttpService();
  const errorService = new ErrorService();
  const masterDataAction = new MasterDataAction();
  const accountAction = new AccountActions();

  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const account: IAccountSlice = useAppSelector((state) => state.Account);

  const [listSubscription, setListSubscription] = useState<IResSubscriptionPackage[]>([]);
  const [accountDetail, setAccountDetail] = useState<IResGetMe | undefined>(account?.getMe?.data);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (account?.getMe?.data) {
      setAccountDetail(account?.getMe?.data);
    }
  }, [account?.getMe?.data]);

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
        dispatch(accountAction.getMe());
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
    accountDetail,
  };
}
