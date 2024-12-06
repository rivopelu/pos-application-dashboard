import { t } from 'i18next';
import { Button, CardActionArea, Checkbox, Divider, FormControlLabel, Tooltip } from '@mui/material';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import clipboardCopy from 'clipboard-copy';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import { IReqCreateAccount } from '../../models/request/IReqCreateAccount.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse } from '../../models/response/ResponseModel.ts';
import { IResCreateAccount } from '../../models/response/IResCreateAccount.ts';
import { ILabelValue } from '../../models/feature-type-interface.ts';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { PageContainer } from '../../components/PageContainer.tsx';
import { PopupModal } from '../../components/PopupModal.tsx';
import { InputText } from '../../components/InputText.tsx';
import { InputSelect } from '../../components/InputSelect.tsx';

export function NewAccountPage() {
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const [onChecked, setOnChecked] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string | undefined>();
  const initState: IReqCreateAccount = {
    role: '',
    name: '',
    username: '',
  };

  async function CopyToClipboard() {
    if (password) {
      try {
        await clipboardCopy(password).then(() => {
          alert(t('password-copying'));
        });
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  }

  const formik = useFormik({
    initialValues: initState,
    onSubmit: (e) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.CREATE_ACCOUNT(), e)
        .then((res: BaseResponse<IResCreateAccount>) => {
          setPassword(res.data.response_data.password);
          setLoadingSubmit(false);
          setShowModal(true);
          formik.setValues(initState);
        })
        .catch((e) => {
          setLoadingSubmit(false);
          errorService.fetchApiError(e);
        });
    },
  });

  function onCloseModal() {
    setPassword(undefined);
    setShowModal(false);
  }

  function validationButton() {
    return !(formik.values.role && formik.values.name && formik.values.username && onChecked);
  }

  const listUserRole: ILabelValue<string>[] = [
    {
      label: 'Staff',
      value: 'STAFF',
    },
    {
      label: 'Admin',
      value: 'ADMIN',
    },
  ];

  function componentModal() {
    return (
      <div className={'flex flex-col gap-4 items-center justify-center text-center'}>
        <div>
          <h1 className={'font-semibold text-2xl capitalize'}>{t('account-success-created')}</h1>
          <p>{t('account-success-created-description')}</p>
        </div>
        <div className={'w-full'}>
          <Tooltip title={t('copy-password')}>
            <CardActionArea onClick={CopyToClipboard}>
              <MainCard>
                <CardBody>
                  <div className={'font-semibold'}>{password}</div>
                </CardBody>
              </MainCard>
            </CardActionArea>
          </Tooltip>
        </div>
        <Button fullWidth variant={'contained'} onClick={onCloseModal}>
          {t('oke')}
        </Button>
      </div>
    );
  }

  return (
    <PageContainer className="mt-8" size={'xs'}>
      <PopupModal onClose={onCloseModal} open={showModal} component={componentModal()} />
      <div>
        <MainCard>
          <CardBody>
            <h1 className={'font-semibold capitalize text-2xl'}>{t('new-account')}</h1>
          </CardBody>
          <Divider />
          <CardBody className={'grid gap-6'}>
            <InputText
              required
              placeholder={t('insert-name')}
              label={t('name')}
              name={'name'}
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <InputText
              required
              placeholder={t('insert-username')}
              label={t('username')}
              name={'username'}
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              errorMessage={formik.touched.username && formik.errors.username}
            />
            <InputSelect
              value={formik.values.role}
              options={listUserRole}
              required
              placeholder={t('insert-user-role')}
              name={'role'}
              onChange={(e) => formik.setFieldValue('role', e)}
              label={t('user-role')}
            />
            <FormControlLabel
              defaultChecked={false}
              checked={onChecked}
              onChange={(_, e) => setOnChecked(e)}
              control={<Checkbox />}
              label={t('show-make-sure-data-alert')}
            />
            <LoadingButton
              disabled={validationButton()}
              loading={loadingSubmit}
              onClick={() => formik.handleSubmit()}
              variant={'contained'}
            >
              {t('submit')}
            </LoadingButton>
          </CardBody>
        </MainCard>
      </div>
    </PageContainer>
  );
}
