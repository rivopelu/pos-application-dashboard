import { useEffect, useState } from 'react';
import { SubscriptionActions } from '../../redux/actions/subscription.action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { IResListSubscription } from '../../models/response/IResListSubscription';
import { ISubscriptionSlice } from '../../redux/reducers/subscription.slice';
import { ITableColumnData, MainTable } from '../../components/MainTable';
import { t } from 'i18next';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper';
import DateHelper from '../../helper/dateHelper';
import { PageContainer } from '../../components/PageContainer';
import { OrderStatusEnumText } from '../../components/OrderStatusEnum';
import { OrderStatusEnum } from '../../enums/order-status-enum';

export function SubscriptionPage() {
  const dispatch = useAppDispatch();
  const subscriptionAction = new SubscriptionActions();
  const numberFormatHelper = new NumberFormatterHelper();
  const dateHelper = new DateHelper();

  const subscription: ISubscriptionSlice = useAppSelector((state) => state.Subscription);

  const [dataList, setDataList] = useState<IResListSubscription[]>([]);

  function fetchData() {
    dispatch(subscriptionAction.getSubscription());
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDataList(subscription?.listSubscription?.data || []);
  }, [subscription.listSubscription]);

  const column: ITableColumnData[] = [
    {
      key: 'id',
      headerTitle: t('id'),
      value: 'id',
    },
    {
      key: 'status',
      headerTitle: t('order-status'),
      layouts: (e: IResListSubscription) => (
        <div>
          <OrderStatusEnumText status={e.status as OrderStatusEnum} />
        </div>
      ),
    },
    {
      key: 'total_transaction',
      headerTitle: t('total-transaction'),
      layouts: (e: IResListSubscription) => <div>{numberFormatHelper.toRupiah(e.total_transaction)}</div>,
    },
    {
      key: 'create-date',
      headerTitle: t('create-date'),
      layouts: (e: IResListSubscription) => (
        <div>{dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm')}</div>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="mt-8 grid gap-5">
        <div>
          <h1>{t('subscription')}</h1>
        </div>
        <MainTable loading={subscription?.listSubscription?.loading} data={dataList} columns={column} />
      </div>
    </PageContainer>
  );
}
