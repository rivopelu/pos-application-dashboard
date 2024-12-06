import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { CircularProgress, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { AnalyticsActions } from '../redux/actions/analytics.actions.ts';
import { NumberFormatterHelper } from '../helper/numberFormatHelper.ts';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { IAnalyticsSlice } from '../redux/reducers/analytics.slice.ts';
import { IResAnalyticsSummary } from '../models/response/IResAnalyticsSummary.ts';
import { ILabelValue } from '../models/feature-type-interface.ts';
import { CardBody, MainCard } from '../components/MainCard.tsx';
import { PageContainer } from '../components/PageContainer.tsx';

export function AnalyticsPage() {
  const actions = new AnalyticsActions();
  const numberFormat = new NumberFormatterHelper();

  const dispatch = useAppDispatch();
  const analytics: IAnalyticsSlice = useAppSelector((state) => state.Analytics);

  const [dataSummary, setDataSummary] = useState<IResAnalyticsSummary | undefined>(undefined);
  const [chartOrder, setChartOrder] = useState<ILabelValue<number>[]>([]);
  const [chartRevenue, setChartRevenue] = useState<ILabelValue<number>[]>([]);

  function fetchData() {
    const dateData = {
      start: new Date(),
      end: new Date(),
    };

    dispatch(actions.getSummary()).then();
    dispatch(actions.getChartOrder(dateData.start, dateData.end)).then();
    dispatch(actions.getChartRevenue(dateData.start, dateData.end)).then();
  }

  useEffect(() => {
    if (analytics?.summaryOrder?.data) {
      setDataSummary(analytics?.summaryOrder?.data);
    }
    if (analytics?.chartOrder?.data) {
      setChartOrder(analytics?.chartOrder?.data);
    }
    if (analytics?.chartRevenue?.data) {
      setChartRevenue(analytics?.chartRevenue?.data);
    }
  }, [analytics]);

  useEffect(() => {
    fetchData();
  }, []);

  function topCard(label: string, data?: any) {
    return (
      <MainCard>
        <CardBody>
          {analytics?.summaryOrder?.loading ? (
            <div className="flex items-center justify-center my-4">
              <CircularProgress />
            </div>
          ) : (
            <>
              <p className={'capitalize italic text-slate-700'}>{label}</p>
              <p className={'text-3xl font-semibold mt-3'}>{data}</p>
            </>
          )}
        </CardBody>
      </MainCard>
    );
  }

  return (
    <PageContainer className={'mt-8'}>
      <div className="grid gap-6">
        <div className={'grid-cols-3 grid gap-4'}>
          {topCard(t('total-revenue'), dataSummary?.total_revenue && numberFormat.toRupiah(dataSummary.total_revenue))}
          {topCard(t('total-items'), dataSummary?.total_items)}
          {topCard(t('total-order'), dataSummary?.total_order)}
        </div>
        <MainCard>
          <CardBody>
            <h3 className="font-semibold text-3xl uppercase  mb-2">{t('order-chart')}</h3>
          </CardBody>
          <Divider />
          <CardBody>
            {chartOrder && chartOrder.length > 0 && (
              <LineChart
                series={[{ data: chartOrder.map((e) => e.value as any) }]}
                sx={{
                  '& .MuiLineElement-root': {
                    strokeWidth: 3,
                  },
                }}
                xAxis={[
                  {
                    id: 'month',
                    data: chartOrder.map((e) => e.label),
                    scaleType: 'point',
                    valueFormatter: (date) => date,
                  },
                ]}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
                height={300}
              />
            )}
          </CardBody>
        </MainCard>
        <MainCard>
          <CardBody>
            <h3 className="font-semibold text-3xl uppercase  mb-2">{t('revenue-chart')}</h3>
          </CardBody>
          <Divider />
          <CardBody>
            {chartRevenue && chartRevenue.length > 0 && (
              <LineChart
                series={[{ data: chartRevenue.map((e) => e.value as any) }]}
                sx={{
                  '& .MuiLineElement-root': {
                    strokeWidth: 3,
                  },
                }}
                xAxis={[
                  {
                    id: 'month',
                    data: chartRevenue.map((e) => e.label),
                    scaleType: 'point',
                    valueFormatter: (date) => date,
                  },
                ]}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
                height={300}
              />
            )}
          </CardBody>
        </MainCard>
      </div>
    </PageContainer>
  );
}
