import { LoadingButton } from '@mui/lab';
import { Button, ButtonGroup, CardActionArea, CircularProgress, IconButton } from '@mui/material';
import { t } from 'i18next';
import { Fragment } from 'react';
import { MdAdd, MdQrCode, MdRemove } from 'react-icons/md';
import { useHomePage } from './useHomePage.ts';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import { IResListProducts } from '../../models/response/IResListProducts.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { STYLE_VARIABLE } from '../../constants/style-variable.ts';
import { PageContainer } from '../../components/PageContainer.tsx';
import { ASSETS } from '../../constants/assets.ts';
import { PopupModal } from '../../components/PopupModal.tsx';
import QRCode from 'react-qr-code';
import { generateUrlOrderQr } from '../../helper/utilsHelper.ts';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/route.ts';

export function HomePage() {
  const page = useHomePage();
  const numberFormatHelper = new NumberFormatterHelper();

  function productCard(item: IResListProducts) {
    return (
      <MainCard>
        <CardActionArea onClick={() => page.onClickItems(item)}>
          <div className={'p-2 rounded-md'}>
            <div className={' aspect-video flex items-center justify-center'}>
              <img className={'bg-white h-full w-full aspect-square object-cover'} src={item.image} alt={item.name} />
            </div>
          </div>
          <CardBody className={'text-center grid gap-2'}>
            <div>
              <div className={'font-bold'}>{item.name}</div>
              <p className={'text-slate-400 italic'}>
                {item.stock} {t('item-available')}
              </p>
            </div>
            <p className={'font-semibold text-primary-dark text-2xl'}>{numberFormatHelper.toRupiah(item.price)}</p>
          </CardBody>
        </CardActionArea>
      </MainCard>
    );
  }

  function categoryList() {
    return (
      <ButtonGroup
        disableElevation
        fullWidth
        variant="outlined"
        aria-label="category list"
        sx={{ background: STYLE_VARIABLE.COLORS.SYSTEM.WHITE }}
      >
        {page.dataCategories.map((item) => {
          return (
            <Button
              onClick={() => page.onClickCategory(item.id)}
              color={item.id === page.selectedCategoryId ? 'primary' : 'inherit'}
              key={item.id}
              size={'large'}
              sx={{
                borderColor: item.id === page.selectedCategoryId ? 'primary' : STYLE_VARIABLE.COLORS.SYSTEM.BORDER,
                background:
                  item.id === page.selectedCategoryId
                    ? STYLE_VARIABLE.COLORS.PRIMARY['10']
                    : STYLE_VARIABLE.COLORS.SYSTEM.WHITE,
              }}
            >
              {item.name}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }

  function productList() {
    return (
      <div className={'grid grid-cols-4 gap-4'}>
        {page.rendererData.map((item) => (
          <Fragment key={item.id}>{productCard(item)}</Fragment>
        ))}
      </div>
    );
  }

  function orderList() {
    return (
      <div className={'w-full'} style={{ width: STYLE_VARIABLE.SIZE.SIDE_CASHIER_WIDTH }}>
        <div>
          <div
            className={'h-screen border fixed bg-white   right-0 top-0 w-full flex flex-col'}
            style={{ width: STYLE_VARIABLE.SIZE.SIDE_CASHIER_WIDTH }}
          >
            <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
            <div className="h-full">
              <PageContainer className={'w-full h-full'}>
                {page.selectedProduct.length > 0 ? (
                  <div className={'h-full flex justify-between flex-col py-5 '}>
                    <div className="h-full">
                      <div className={' max-h-[60%] h overflow-y-auto flex flex-col gap-2'}>
                        {page.selectedProduct.map((item, i) => (
                          <MainCard key={i} className="h-fit">
                            <CardBody className="p-1">
                              <div className="flex gap-4">
                                <img alt={item.name} src={item.image} className="h-24 aspect-square object-cover" />
                                <div className="p-3 flex justify-between w-full">
                                  <div>
                                    <p className="font-semibold">{item.name} </p>
                                    <p className="italic text-slate-500 text-xs">
                                      {numberFormatHelper.toRupiah(item.price)}{' '}
                                      <span className="font-semibold text-base text-primary-dark">
                                        x {item.selected_qty}
                                      </span>
                                    </p>
                                    <p>
                                      {numberFormatHelper.toRupiah(
                                        item.price * (item.selected_qty ? item.selected_qty : 1),
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-center gap-4">
                                    <IconButton onClick={() => page.onClickMinItems(item)}>
                                      <div className="bg-primary-main/10 border text-primary-main border-primary-main p-2 rounded-full">
                                        <MdRemove fontSize={24} />
                                      </div>
                                    </IconButton>
                                    <div className="font-bold text-primary-main">{item.selected_qty}</div>
                                    <IconButton onClick={() => page.onClickItems(item)}>
                                      <div className="bg-primary-main/10 border text-primary-main border-primary-main p-2 rounded-full">
                                        <MdAdd fontSize={24} />
                                      </div>
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </MainCard>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="grid gap-4 bg-slate-100 border p-6 rounded-md capitalize">
                        <div className="font-semibold text-2xl text-slate-500">{t('order-summary')}</div>
                        <div className="flex justify-between">
                          <div>{t('total-items')}</div>
                          <div>{page.totalItems}</div>
                        </div>
                        <div className="flex justify-between">
                          <div>{t('sub-total')}</div>
                          <div>{numberFormatHelper.toRupiah(page.totalAmount)}</div>
                        </div>
                        <div className="flex justify-between">
                          <div>{t('tax-11')}</div>
                          <div>
                            {numberFormatHelper.toRupiah(numberFormatHelper.calculateTaxPercentage(page.totalAmount))}
                          </div>
                        </div>
                        <div className="flex justify-between font-bold text-2xl">
                          <div>{t('total')}</div>
                          <div>
                            {numberFormatHelper.toRupiah(
                              page.totalAmount + numberFormatHelper.calculateTaxPercentage(page.totalAmount),
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-4 grid gap-4">
                        <LoadingButton
                          loading={page.loadingSubmitOrder}
                          size="large"
                          fullWidth
                          onClick={page.onSubmitOpenBill}
                          variant="outlined"
                        >
                          {t('open-bill')}
                        </LoadingButton>
                        <LoadingButton
                          size="large"
                          fullWidth
                          variant="contained"
                          loading={page.loadingSubmitOrder}
                          onClick={page.onSubmitPayNow}
                        >
                          {t('pay-now')}
                        </LoadingButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  emptyState()
                )}
              </PageContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function emptyState() {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-12 ">
        <div className={'flex items-center justify-center flex-col'}>
          <img alt="empty state" className="w-1/2" src={ASSETS.IL_EMPTY_STATE} />
          <h1 className="pt-8 text-2xl text-slate-400 italic">{t('no-items-selected')}</h1>
        </div>
        <div>
          <Button
            onClick={() => page.setShowModalGenerateQr(true)}
            size={'large'}
            variant={'outlined'}
            startIcon={<MdQrCode />}
          >
            {t('generate-order-qr')}
          </Button>
        </div>
      </div>
    );
  }

  function modalSuccessCreateOrderComponent() {
    return (
      <div className="flex flex-col gap-24 items-center justify-between">
        <h1 className="text-center font-semibold text-2xl uppercase">{t('order-success-created')}</h1>
        <img className="w-1/2" alt="success gift" src={ASSETS.GIF_SUCCESS} />
        <Button onClick={page.onCloseModal} variant="contained" size="large" fullWidth>
          {t('oke')}
        </Button>
      </div>
    );
  }

  function modalGenerateQr() {
    return (
      <div className="flex flex-col gap-12 items-center justify-between ">
        <h1 className={'text-2xl text-center capitalize font-semibold max-w-[260px]'}>
          {t('generate-qr-code-for-new-order')}
        </h1>
        {page.qrCodeValue ? (
          <div className={'p-8'}>
            <QRCode
              size={120}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={generateUrlOrderQr(page.qrCodeValue)}
              viewBox={`0 0 256 256`}
            />
            <Link to={ROUTES.PUBLIC_MENU_LIST_PAGE(page.qrCodeValue)}>
              <Button>GO TO PAGE</Button>
            </Link>
          </div>
        ) : (
          <>
            {page.loadingGenerateQr ? (
              <CircularProgress size={64} />
            ) : (
              <img src={ASSETS.IL_QR_CODE} className={'w-1/2'} alt={'img_qr'} />
            )}
          </>
        )}

        {page.qrCodeValue ? (
          <Button variant={'contained'} size={'large'} fullWidth>
            {t('print')}
          </Button>
        ) : (
          <div className={'w-full flex flex-col gap-4'}>
            <LoadingButton
              loading={page.loadingGenerateQr}
              onClick={page.onSubmitGenerateQr}
              variant={'contained'}
              color={'success'}
              size={'large'}
              fullWidth={true}
            >
              {t('yes')}
            </LoadingButton>
            <Button
              onClick={() => page.onCloseModalGenerateQr()}
              variant={'contained'}
              color={'error'}
              size={'large'}
              fullWidth={true}
            >
              {t('cancel')}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <main className={'flex '}>
      <PopupModal
        onClose={page.onCloseModal}
        open={page.openModalSuccess}
        component={modalSuccessCreateOrderComponent()}
      />
      <PopupModal
        onClose={() => page.onCloseModalGenerateQr()}
        open={page.showModalGenerateQr}
        component={modalGenerateQr()}
      />
      <div className={' flex-1'}>
        <PageContainer className={' '}>
          <div className={'mt-6 w-full grid gap-4'}>
            {categoryList()}
            {productList()}
          </div>
        </PageContainer>
      </div>
      {orderList()}
    </main>
  );
}
