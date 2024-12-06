import { STYLE_VARIABLE } from '../../constants/style-variable.ts';
import { BrandLogo } from '../../components/BrandLogo.tsx';
import { usePublicMenuListPage } from './usePublicMenuListPage.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import { Badge, Button, CardActionArea, CircularProgress, Divider, Fab, IconButton } from '@mui/material';
import { MdAdd, MdClose, MdRemove, MdShoppingCart } from 'react-icons/md';
import { MainDrawer } from '../../components/MainDrawer.tsx';
import { t } from 'i18next';
import { ASSETS } from '../../constants/assets.ts';
import { LoadingButton } from '@mui/lab';

export function PublicMenuListPage() {
  const page = usePublicMenuListPage();
  const numberFormatHelper = new NumberFormatterHelper();

  function bodyModalSelectedItem() {
    return (
      <div>
        <CardBody>
          <div className={'flex items-center justify-between'}>
            <h1>{t('select-items')}</h1>
            <IconButton onClick={page.onCloseActiveItem}>
              <MdClose />
            </IconButton>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <div className={'flex flex-col items-center justify-center mb-5 gap-4'}>
            <div className={'text-center'}>
              <h1 className={'font-semibold'}>{page.activeItem?.name || ''}</h1>
              <p className={' text-slate-600'}>
                {page.activeItem?.price ? numberFormatHelper.toRupiah(page.activeItem.price) : ''}
              </p>
            </div>
            <img
              src={page.activeItem?.image}
              alt={page.activeItem?.name}
              className={'w-1/2 border rounded-md aspect-square'}
            />
            <div className={'flex items-center justify-center gap-3'}>
              <IconButton onClick={() => page.onClickMin()}>
                <div className={'border rounded-full p-3 bg-slate-100'}>
                  <MdRemove />
                </div>
              </IconButton>
              <div>{page.qtyActiveItem()}</div>
              <IconButton onClick={() => page.onClickPlus()}>
                <div className={'border rounded-full p-3 bg-slate-100'}>
                  <MdAdd />
                </div>
              </IconButton>
            </div>
            <p className={' text-slate-600'}>
              {page.activeItem?.price && page.qtyActiveItem()
                ? numberFormatHelper.toRupiah(page.activeItem.price * page.qtyActiveItem())
                : ''}
            </p>
            <div className={'w-full mt-5'}>
              <Button onClick={page.onCloseActiveItem} variant={'contained'} fullWidth>
                {t('close')}
              </Button>
            </div>
          </div>
        </CardBody>
      </div>
    );
  }

  function topBar() {
    return (
      <nav className={'bg-white border-b  top-0 z-50 flex flex-col items-center justify-center fixed w-screen'}>
        <div className={'py-4'}>
          <BrandLogo />
        </div>
        <div className={'flex items-center overflow-x-auto  w-full border-t '}>
          {page.listCategory.map((item, i) => (
            <div key={i} className={'w-full'}>
              <CardActionArea onClick={() => page.onClickCategory(item)}>
                <div
                  className={`py-3 border-b  text-center px-4 overflow-x-auto w-full min-w-[200px] duration-200 ${page?.selectedCategory?.id === item.id ? 'border-b-primary-main text-primary-main bg-primary-main/10 ' : ' '}`}
                >
                  {item.name}
                </div>
              </CardActionArea>
            </div>
          ))}
        </div>
      </nav>
    );
  }

  function emptyStateCart() {
    return (
      <div>
        <div className="flex items-center justify-center h-full flex-col gap-12  py-10">
          <div className={'flex items-center justify-center flex-col'}>
            <img alt="empty state" className="w-1/2" src={ASSETS.IL_EMPTY_STATE} />
            <h1 className="pt-8 text-2xl text-slate-400 italic">{t('no-items-selected')}</h1>
          </div>
        </div>
      </div>
    );
  }

  function componentCartDrawer() {
    return (
      <div>
        <div className={'fixed border-b w-full bg-white'}>
          <CardBody className={'flex items-center justify-between'}>
            <div>{'cart'}</div>
            <IconButton onClick={() => page.setShowCart(false)}>
              <MdClose />
            </IconButton>
          </CardBody>
        </div>
        <div className={'h-24 '}></div>
        {page.selectedProduct.length > 0 ? (
          <CardBody>
            <div className={'grid gap-3'}>
              {page.selectedProduct.map((item, i) => (
                <div key={i} className={'w-full border-b pb-3 flex justify-between items-center'}>
                  <div>
                    <div className={'font-semibold'}>{item.name}</div>
                    <div className={`text-xs text-slate-600 italic`}>
                      {numberFormatHelper.toRupiah(item.price)} x {item.selected_qty}
                    </div>
                  </div>
                  <div>{numberFormatHelper.toRupiah(item.price * (item.selected_qty || 0))}</div>
                </div>
              ))}
            </div>
            <div className={'mt-4'}>
              <div className="grid gap-4    rounded-md capitalize">
                <div className="font-semibold text-xl text-slate-500">{t('order-summary')}</div>
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
                  <div>{numberFormatHelper.toRupiah(numberFormatHelper.calculateTaxPercentage(page.totalAmount))}</div>
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
                  size="large"
                  fullWidth
                  variant="contained"
                  loading={page.loadingSubmit}
                  onClick={page.onSubmitProcessOrder}
                >
                  {t('process')}
                </LoadingButton>
              </div>
            </div>
          </CardBody>
        ) : (
          emptyStateCart()
        )}
      </div>
    );
  }

  return (
    <div className={'w-full bg-slate-100 '}>
      {
        page.loadingCheckStatusOrder &&
        <div className='fixed top-0 right-0 h-screen w-screen flex items-center bg-white z-[200] flex-col justify-center'>
          <CircularProgress size={48} />
          <div className='mt-3'>LOADING</div>
        </div>
      }
      {topBar()}
      <MainDrawer
        open={!!page.activeItem}
        component={bodyModalSelectedItem()}
        onClose={() => page.setActiveItem(undefined)}
      />
      <MainDrawer open={page.showCart} component={componentCartDrawer()} onClose={() => page.setShowCart(false)} />
      <div className={'max-w-2xl mx-auto bg-white min-h-screen relative '}>
        <div className={'px-4 pt-32 grid gap-3'}>
          {page.rendererData.map((e, i) => (
            <MainCard
              key={i}
              className={`${page.selectedProduct.findIndex((v) => e.id === v.id) > -1 ? 'border-primary-main bg-primary-main/30' : ''}`}
            >
              <CardActionArea onClick={() => page.onClickItem(e)}>
                <div className={'p-1 flex gap-2'}>
                  <img className={'h-24 aspect-square'} src={e.image} alt={e.name} />
                  <div className={'p-3 flex w-full gap-4 justify-between items-center'}>
                    <div className={'flex flex-col justify-center'}>
                      <div>{e.name}</div>
                      <p className={'font-semibold text-xl'}>{numberFormatHelper.toRupiah(e.price)}</p>
                    </div>
                    <div className='p-5'>
                      <MdAdd />
                    </div>
                  </div>
                </div>
              </CardActionArea>
            </MainCard>
          ))}

          <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
        </div>
        <div className={'fixed right-4 bottom-4'}>
          <Badge
            invisible={page.selectedProduct.length === 0}
            badgeContent={page.selectedProduct.length}
            color="secondary"
          >
            <Fab color="primary" aria-label="add" onClick={() => page.setShowCart(true)}>
              <MdShoppingCart />
            </Fab>
          </Badge>
        </div>
      </div>
    </div>
  );
}
