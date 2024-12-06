import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, Divider, FormControlLabel, IconButton } from '@mui/material';

import { useFormik } from 'formik';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { IReqCategory } from '../../models/request/IReqCategory.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { ROUTES } from '../../routes/route.ts';
import { PageContainer } from '../../components/PageContainer.tsx';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { SortableList } from '../../components/SortableList.tsx';
import { InputText } from '../../components/InputText.tsx';

export function NewCategoryPage() {
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const masterDataActions = new MasterDataAction();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [onChecked, setOnChecked] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const initState: IReqCategory[] = [
    {
      id: '1',
      name: '',
    },
  ];

  const formik = useFormik({
    initialValues: initState,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_NEW_CATEGORY(), e)
        .then(() => {
          navigate(ROUTES.MASTER_DATA());
        })
        .catch((e) => {
          setLoadingSubmit(false);
          errorService.fetchApiError(e);
        });
    },
  });

  useEffect(() => {
    setIsEdit(location.pathname === ROUTES.EDIT_CATEGORY());
  }, [location.pathname]);

  useEffect(() => {
    if (isEdit) {
      dispatch(masterDataActions.getListCategories()).then();
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit && masterData.listCategories?.data) {
      const data: IReqCategory[] = masterData.listCategories.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      formik.setValues(data);
    }
  }, [isEdit, masterData.listCategories]);

  function onClickAdd() {
    const data = formik.values;
    formik.setValues([...data, { id: new Date().getTime().toString(), name: '' }]);
  }

  function onChangeDnd(e: IReqCategory[]) {
    formik.setValues(e);
  }

  function checkDisableButtonAdd(): boolean {
    const data = formik.values;
    return data.some((e) => !e.name);
  }

  function onClickRemoveItem(i: string) {
    const removeData = formik.values.filter((e) => e.id !== i);
    formik.setValues(removeData);
  }
  return (
    <PageContainer size="xs">
      <div className="mt-5 ">
        <MainCard>
          <CardBody>
            <div className="grid gap-5">
              <h1 className="font-semibold text-center uppercase">
                {t(isEdit ? 'edit-categories' : 'create-new-category')}
              </h1>
              <div>
                <SortableList
                  className="grid gap-4"
                  items={formik.values}
                  onChange={(e) => onChangeDnd(e)}
                  renderItem={(item, i) => (
                    <SortableList.Item id={item.id}>
                      <MainCard className="relative">
                        <CardBody>
                          <div className="flex items-center gap-4 relative">
                            <div className="">
                              <IconButton onClick={() => onClickRemoveItem(item.id)}>
                                <div>
                                  <MdClose />
                                </div>
                              </IconButton>
                            </div>
                            <div className="w-full">
                              <InputText
                                onChange={formik.handleChange}
                                value={formik.values[i]?.name || ''}
                                name={`[${i}].name`}
                                placeholder={t('insert-category-name')}
                              />
                            </div>
                            <SortableList.DragHandle />
                          </div>
                        </CardBody>
                      </MainCard>
                    </SortableList.Item>
                  )}
                />
              </div>
              <Button disabled={checkDisableButtonAdd()} onClick={onClickAdd} variant="outlined" endIcon={<MdAdd />}>
                {t('add')}
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardBody className="grid gap-5">
            <FormControlLabel
              defaultChecked={false}
              checked={onChecked}
              onChange={(_, e) => setOnChecked(e)}
              control={<Checkbox />}
              label={t('show-make-sure-data-alert')}
            />
            <LoadingButton
              loading={loadingSubmit}
              disabled={!onChecked}
              onClick={() => formik.handleSubmit()}
              fullWidth
              variant="contained"
            >
              {t('submit')}
            </LoadingButton>
          </CardBody>
        </MainCard>
      </div>
    </PageContainer>
  );
}
