import { LoadingButton } from '@mui/lab';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import { useHomePage } from './useHomePage.ts';
import { t } from 'i18next';
import DateHelper from '../../helper/dateHelper.ts';

export function HomePage() {
  const page = useHomePage();
  const numberFormatHelper = new NumberFormatterHelper();
  const dateHelper = new DateHelper();

  return (
    <main className={''}>
      <PageContainer>
        <div className="mt-8 grid gap-6">
          <MainCard>
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="capitalize">{t('expire-date')}</div>
                <div className="text-2xl">
                  {page.accountDetail?.subscription_expired_date
                    ? dateHelper.toFormatDate(
                        new Date(page.accountDetail.subscription_expired_date),
                        'dd LLLL, yyyy - HH:mm',
                      )
                    : ''}
                </div>
              </div>
            </CardBody>
          </MainCard>
          <div className="grid grid-cols-3 gap-8">
            {page.listSubscription.map((item, i) => (
              <MainCard key={i}>
                <CardBody>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-3xl font-semibold capitalize">{item.package_name}</div>
                    <div className="text-2xl">{numberFormatHelper.toRupiah(item.price)}</div>
                    <div className="text-3xl font-semibold capitalize">
                      {item.duration_per_day} {t('day')}
                    </div>
                    <LoadingButton onClick={() => page.onClickSubscribe(item)}>{t('subscribe')}</LoadingButton>
                  </div>
                </CardBody>
              </MainCard>
            ))}
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
