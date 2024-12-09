import { LoadingButton } from '@mui/lab';
import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { InputText } from '../../components/InputText';
import { InputTextarea } from '../../components/InputTextArea';
import { ENDPOINT } from '../../constants/endpoint';
import { IReqEditBusinessInformation } from '../../models/request/IReqEditBusinessInformation';
import { AccountActions } from '../../redux/actions/account.actions';
import { IAccountSlice } from '../../redux/reducers/account.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ErrorService from '../../service/error.service';
import { HttpService } from '../../service/http.service';
import { UiServices } from '../../service/ui.service';

export function BusinessSetting() {
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const accountActions = new AccountActions();
  const uiService = new UiServices();

  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const accont: IAccountSlice = useAppSelector((state) => state.Account);
  const data = accont?.getMe?.data;

  const initState: IReqEditBusinessInformation = {
    address: '',
    logo: '',
    name: '',
  };

  useEffect(() => {
    if (data) {
      const value: IReqEditBusinessInformation = {
        address: data?.address || '',
        logo: data.client_logo,
        name: data.client_name,
      };

      formik.setValues(value);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: initState,
    onSubmit: (value) => {
      setLoadingSubmit(true);
      httpService
        .PUT(ENDPOINT.EDIT_BUSINESS(), { note: value.address, ...value })
        .then(() => {
          setLoadingSubmit(false);
          dispatch(accountActions.getMe());
          setIsEdit(false);
          uiService.handleSnackbarSuccess(t('your-business-success-updated'));
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    },
  });

  function formComponent() {
    return (
      <div className="grid gap-5 p-7">
        <InputText
          label={t('business-name')}
          placeholder={t('insert-business-name')}
          required
          name={'name'}
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          errorMessage={formik.touched.name && formik.errors.name}
        />
        <InputTextarea
          label={t('business-address')}
          placeholder={t('insert-business-address')}
          required
          name={'address'}
          onChange={formik.handleChange}
          value={formik.values.address}
          onBlur={formik.handleBlur}
          errorMessage={formik.touched.address && formik.errors.address}
        />
        <LoadingButton variant="contained" loading={loadingSubmit} onClick={() => formik.handleSubmit()}>
          {t('submit')}
        </LoadingButton>
      </div>
    );
  }

  function display() {
    return (
      <div className="flex   w-full my-10 flex-col items-center gap-4">
        <div>
          <Avatar src={data?.client_logo} sx={{ height: 100, width: 100 }} />
        </div>
        <div className="text-center">
          <h1 className="font-semibold text-2xl uppercase">{data?.client_name}</h1>
          <div>
            <p>{data?.address || '-'}</p>
          </div>
        </div>
        <Button variant="contained" startIcon={<MdEdit />} onClick={() => setIsEdit(true)}>
          {t('edit-business-information')}
        </Button>
      </div>
    );
  }

  return <div>{isEdit ? formComponent() : display()}</div>;
}
