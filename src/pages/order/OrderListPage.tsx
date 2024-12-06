import { useOrderListPage } from './useOrderListPage.ts';
import { t } from 'i18next';
import { Button, CardActionArea, CircularProgress, IconButton } from '@mui/material';
import { MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import DateHelper from '../../helper/dateHelper.ts';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import { IResListOrder } from '../../models/response/IResListOrder.ts';
import { OrderStatusEnumText } from '../../components/OrderStatusEnum.tsx';
import { OrderStatusEnum } from '../../enums/order-status-enum.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { PopupModal } from '../../components/PopupModal.tsx';
import { ROUTES } from '../../routes/route.ts';
import MainPagination from '../../components/MainPagination.tsx';

export function OrderListPage() {
  const page = useOrderListPage();
  const dateHelper = new DateHelper();
  const numberFormatHelper = new NumberFormatterHelper();

  const tableColumn: ITableColumnData[] = [
    {
      key: 'order_code',
      headerTitle: t('order-code'),
      value: 'order_code',
    },

    {
      key: 'order_status',
      headerTitle: t('order-status'),
      layouts: (e: IResListOrder) => <OrderStatusEnumText status={e.order_status} />,
    },

    {
      key: 'is_payment',
      headerTitle: t('payment-status'),
      layouts: (e: IResListOrder) => {
        if (e.is_payment) {
          return <div className="font-semibold uppercase text-green-600">{t('full-payment')}</div>;
        } else {
          return <div className="font-semibold uppercase text-red-600">{t('open-bill')}</div>;
        }
      },
    },
    {
      key: 'total_transaction',
      headerTitle: t('total-transaction'),
      layouts: (e: IResListOrder) => (
        <div>{e?.total_transaction ? numberFormatHelper.toRupiah(e.total_transaction) : '-'}</div>
      ),
    },
    {
      key: 'total_items',
      headerTitle: t('total-items'),
      layouts: (e: IResListOrder) => <div>{e?.total_items ? `${e.total_items} item` : '-'}</div>,
    },
    {
      key: 'created_date',
      headerTitle: t('created-date'),
      layouts: (e: IResListOrder) => {
        return (
          <div>
            {e?.created_date ? dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm') : '-'}
          </div>
        );
      },
    },
    {
      key: 'action',
      headerTitle: t('action'),
      layouts: (e: IResListOrder) => {
        if (e.order_status !== OrderStatusEnum.COMPLETED) {
          return (
            <div>
              <IconButton onClick={() => page.setSelectedOrder(e)}>
                <MdInfo />
              </IconButton>
            </div>
          );
        } else {
          return <></>;
        }
      },
    },
  ];

  function modalComponent() {
    return (
      <div className="grid gap-8 w-96">
        <div className="flex flex-col text-center ">
          <div className="text-slate-500 italic">{t('order-code')}</div>
          <div className="font-semibold text-6xl text-center ">{page.selectedOrder?.order_code || '-'}</div>
        </div>

        <div className="grid gap-2">
          {page.selectedOrder && page.selectedOrder.order_status === OrderStatusEnum.IN_PROGRESS && (
            <CardActionArea onClick={page.onClickReadyToTake}>
              <MainCard className="border-blue-600 text-blue-600 bg-blue-600/20">
                <CardBody className="text-center flex items-center justify-center">
                  {page.loadingSubmit ? <CircularProgress /> : <h1 className="uppercase">{t('ready-to-take')}</h1>}
                </CardBody>
              </MainCard>
            </CardActionArea>
          )}
          <CardActionArea onClick={page.onClickCompleteOrder}>
            <MainCard className="border-primary-main text-primary-main bg-primary-main/20">
              <CardBody className="text-center flex items-center justify-center">
                {page.loadingSubmit ? <CircularProgress /> : <h1 className="uppercase">{t('complete-order')}</h1>}
              </CardBody>
            </MainCard>
          </CardActionArea>
        </div>
      </div>
    );
  }

  return (
    <PageContainer>
      <PopupModal
        onClose={() => page.setSelectedOrder(undefined)}
        open={!!page.selectedOrder}
        component={modalComponent()}
      />
      <div className="mt-8 grid gap-5">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-3xl">{t('order-list')}</h1>
          <Link to={ROUTES.LIVE_ORDER(OrderStatusEnum.READY)}>
            <Button variant="outlined">{t('live-order')}</Button>
          </Link>
        </div>
        <MainTable loading={page.loading} columns={tableColumn} data={page.dataList} />
        <MainPagination data={page.paginatedData} onChange={page.onChangePagination}/>
      </div>
    </PageContainer>
  );
}
