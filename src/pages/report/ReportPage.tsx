import { Button, Divider, IconButton, Tooltip } from '@mui/material';
import { AxiosResponse } from 'axios';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { MdClose, MdDownload, MdInfoOutline } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import DateHelper from '../../helper/dateHelper.ts';
import { AnalyticsActions } from '../../redux/actions/analytics.actions.ts';
import { IAnalyticsSlice } from '../../redux/reducers/analytics.slice.ts';
import { defaultPaginationType } from '../../helper/paginationHelper.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import { IResSalesReport } from '../../models/response/IResSalesReport.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { FilterDrawer } from '../../components/FilterDrawer.tsx';
import MainPagination from '../../components/MainPagination.tsx';
import { defaultPaginatedResponse } from '../../models/response/ResponseModel.ts';
import { ROUTES } from '../../routes/route.ts';

export function ReportPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const analyticsActions = new AnalyticsActions();
  const numberFormatHelper = new NumberFormatterHelper();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const dateHelper = new DateHelper();

  const analytics: IAnalyticsSlice = useAppSelector((state) => state.Analytics);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  function fetchData(param?: string) {
    dispatch(analyticsActions.getSalesReport(param)).then();
  }

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.REPORT(e));
  }

  function downloadReport() {
    httpService
      .GET(ENDPOINT.DOWNLOAD_REPORT())
      .then((res: AxiosResponse) => {
        const blob = new Blob([res.data], { type: 'text/csv' });
        const link = document.createElement('a');

        link.download = `report_${dateHelper.toFormatDate(new Date(), 'yyyy-MM-dd')}_.csv`;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
      });
  }

  useEffect(() => {
    fetchData(location?.search);
  }, [location?.search]);

  const tableColumn: ITableColumnData[] = [
    {
      key: 'product_name',
      headerTitle: t('product-name'),
      value: 'product_name',
    },
    {
      key: 'qty',
      headerTitle: t('qty'),
      value: 'qty',
    },
    {
      key: 'total_transaction',
      headerComponent: (
        <div className="flex items-center  gap-1">
          <div>{t('total-transaction')}</div>
          <Tooltip title={t('price-after-tax')}>
            <IconButton>
              <MdInfoOutline />
            </IconButton>
          </Tooltip>
        </div>
      ),
      layouts: (e: IResSalesReport) => {
        return (
          <div className="flex gap-2">
            <div>
              {numberFormatHelper.toRupiah(e.total_price + numberFormatHelper.calculateTaxPercentage(e.total_price))}
            </div>
          </div>
        );
      },
    },
    {
      key: 'created_date',
      headerTitle: t('date'),
      layouts: (e: IResSalesReport) => <div>{dateHelper.toFormatDate(new Date(e.date), 'dd LLLL, yyyy - HH:mm')}</div>,
    },
  ];

  function filterComponent() {
    return (
      <MainCard className="h-[80%] w-[300px]">
        <CardBody className="flex items-center justify-between">
          <h1 className="capitalize text-2xl font-semibold">{t('filter')}</h1>
          <IconButton onClick={() => setShowFilter(false)}>
            <MdClose />
          </IconButton>
        </CardBody>
        <Divider />
      </MainCard>
    );
  }

  return (
    <PageContainer className="mt-8">
      <FilterDrawer open={showFilter} component={filterComponent()} />
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold capitalize">{t('sales-report')}</h1>
          <Button onClick={() => downloadReport()} variant="outlined" startIcon={<MdDownload />}>
            {t('download-report')}
          </Button>
        </div>
        <MainTable
          loading={analytics?.salesReport?.loading}
          columns={tableColumn}
          data={analytics?.salesReport?.data || []}
        />
        <MainPagination
          onChange={onChangePagination}
          data={analytics?.salesReport?.paginated_data || defaultPaginatedResponse}
        />
      </div>
    </PageContainer>
  );
}
