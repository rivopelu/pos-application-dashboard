import { Button } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { IResListCategoriesProductList } from '../../models/response/IResListCategoriesProductList.ts';
import { PageContainer } from '../../components/PageContainer.tsx';
import { ROUTES } from '../../routes/route.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';

export function MasterDataPage() {
  const dispatch = useAppDispatch();
  const masterDataActions = new MasterDataAction();

  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [categoryData, setCategoryData] = useState<IResListCategoriesProductList[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCategoryData(masterData.listCategories?.data || []);
  }, [masterData?.listCategories]);

  function fetchData() {
    dispatch(masterDataActions.getListCategories()).then();
  }

  return (
    <PageContainer>
      <div className="grid gap-5 mt-10">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-3xl capitalize">{t('categories')}</h3>
            <Link to={categoryData && categoryData.length > 1 ? ROUTES.EDIT_CATEGORY() : ROUTES.NEW_CATEGORY()}>
              <Button variant="contained">
                {t(categoryData && categoryData.length > 1 ? 'edit-categories' : 'create-new-category')}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categoryData.map((item, i) => (
              <MainCard key={i}>
                <CardBody>
                  <p className="text-2xl font-semibold">{item.name}</p>
                  <p className="text-slate-400 italic mt-2">#{item.id}</p>
                </CardBody>
              </MainCard>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
