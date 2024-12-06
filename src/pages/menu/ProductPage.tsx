import { Button, IconButton, Tooltip } from '@mui/material';
import { t } from 'i18next';
import { useEffect } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { NumberFormatterHelper } from '../../helper/numberFormatHelper.ts';
import DateHelper from '../../helper/dateHelper.ts';
import { ITableColumnData, MainTable } from '../../components/MainTable.tsx';
import { IResListProducts } from '../../models/response/IResListProducts.ts';
import { ROUTES } from '../../routes/route.ts';
import { PageContainer } from '../../components/PageContainer.tsx';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';

export function ProductPage() {
  const dispatch = useAppDispatch();
  const masterDataActions = new MasterDataAction();
  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const loading = masterData?.listProduct?.loading;

  const numberFormatHelper = new NumberFormatterHelper();
  const dateHelper = new DateHelper();

  useEffect(() => {
    dispatch(masterDataActions.getListProduct());
  }, []);
  const tableColumn: ITableColumnData[] = [
    {
      key: 'name',
      headerTitle: t('name'),
      layouts: (e: IResListProducts) => <div>{e.name}</div>,
    },
    {
      key: 'price',
      headerTitle: t('price'),
      layouts: (e: IResListProducts) => <div>{e.price ? numberFormatHelper.toRupiah(e.price) : '-'}</div>,
    },
    {
      key: 'created_by',
      headerTitle: t('created-by'),
      layouts: (e: IResListProducts) => <div>{e.price ? e.created_by : '-'}</div>,
    },
    {
      key: 'created_date',
      headerTitle: t('created-date'),
      layouts: (e: IResListProducts) => (
        <div>{e.created_date ? dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm') : '-'}</div>
      ),
    },
    {
      key: 'action',
      headerTitle: t('action'),
      layouts: (e: IResListProducts) => (
        <div>
          <Tooltip title={t('edit')}>
            <Link to={ROUTES.EDIT_PRODUCT(e.id)}>
              <IconButton>
                <MdEdit />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <div className="mt-5">
      <PageContainer>
        <div className="grid gap-5">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold italic text-3xl capitalize">{t('menu-list')}</h1>
            <Link to={ROUTES.NEW_MENU()}>
              <Button startIcon={<MdAdd />} variant="contained">
                {t('new-menu')}
              </Button>
            </Link>
          </div>
          <MainTable loading={loading} columns={tableColumn} data={masterData?.listProduct?.data || []} />
        </div>
      </PageContainer>
    </div>
  );
}
