import { CircularProgress, IconButton } from '@mui/material';
import { MdCheck, MdClose, MdInfo, MdVolumeUp } from 'react-icons/md';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { playOrderNumberSound } from '../../helper/utilsHelper.ts';
import { useLiveOrder } from './useLiveOrder.ts';
import { PopupModal } from '../../components/PopupModal.tsx';
import { t } from 'i18next';
import { InputSelect } from '../../components/InputSelect.tsx';
import { useDataConstants } from '../../constants/useDataConstants.ts';
import { OrderStatusEnum } from '../../enums/order-status-enum.ts';

export function LiveOrder()
{
  const page = useLiveOrder();

  function bodyModalDetail()
  {
    if (page.loadingGetDetail)
    {
      return (
        <div className="w-96 h-96 flex items-center justify-center">
          <CircularProgress size={62} />
        </div>
      );
    }
    return (
      <div className={'min-w-96 w-full grid gap-6'}>
        <div className='flex items-center justify-between'>
          <p className='text-4xl font-semibold '>{page.dataDetail?.code}</p>
          <IconButton onClick={page.onCloseModalDetail}>
            <MdClose />
          </IconButton>
        </div>
        <div className='grid gap-3'>
          {page?.dataDetail?.products && page.dataDetail.products.map((item) => <div key={item.id}>
            <div className='bg-slate-100 border-slate-300 p-4 text-4xl flex items-center justify-between gap-24'>
              <div>{item.name}</div>
              <div>x{item.qty}</div>
            </div>
          </div>
          )}
        </div>
      </div>
    );
  }

  function listGrid()
  {
    return (
      <div className="grid grid-cols-3 gap-3 bg-slate-200 p-3 rounded-md">
        {page.dataList.map((item, i) => (
          <MainCard key={i}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-2xl">{item.order_code}</div>
                <div>
                  <IconButton onClick={() => page.onClickDetail(item)}>
                    <div className="border-slate-700 border text-slate-700 bg-slate-700/10 flex items-center justify-center h-10 w-10 rounded-full">
                      <MdInfo />
                    </div>
                  </IconButton>
                  <IconButton onClick={() => playOrderNumberSound(item.order_code)}>
                    <div className="border-blue-700 border text-blue-700 bg-blue-700/10 flex items-center justify-center h-10 w-10 rounded-full">
                      <MdVolumeUp />
                    </div>
                  </IconButton>
                  <IconButton onClick={() => page.onClickComplete(item)}>
                    <div className="border-green-700 border text-green-700 bg-green-700/10 flex items-center justify-center h-10 w-10 rounded-full">
                      {page.loadingSubmit === item.id ? <CircularProgress size={16} /> : <MdCheck />}
                    </div>
                  </IconButton>
                </div>
              </div>
            </CardBody>
          </MainCard>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <PopupModal open={page.showModalDetail} component={bodyModalDetail()} onClose={page.onCloseModalDetail} />
      <PageContainer>
        <div>
          <div className='flex items-center justify-between mb-8'>
            <div className='text-3xl font-semibold italic capitalize'>{t("live-order")}</div>
            <div>
              <InputSelect placeholder={t("select-status")} onChange={(e) => page.onChangeFilter(e as OrderStatusEnum)} value={page.selectedStatus} options={useDataConstants().listDataFilterOrderStatus} />
            </div>
          </div>
          <div className="grid grid-cols- gap-4">
            {listGrid()}
            {/* {listGrid()} */}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
