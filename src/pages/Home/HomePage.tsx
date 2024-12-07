import { LoadingButton } from '@mui/lab';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import { useHomePage } from './useHomePage.ts';
import { t } from 'i18next';

export function HomePage() {
  const page = useHomePage();
  const numberFormatHelper = new NumberFormatterHelper();
  return (
    <main className={''}>
      <PageContainer>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-8">
            {page.listSubscription.map((item, i) => (
              <MainCard>
                <CardBody>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-3xl font-semibold capitalize">{item.package_name}</div>
                    <div className="text-2xl">{numberFormatHelper.toRupiah(item.price)}</div>
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
