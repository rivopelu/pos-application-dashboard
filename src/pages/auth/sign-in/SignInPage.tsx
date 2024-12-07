import { t } from 'i18next';
import { Alert, Checkbox, Divider, FormControlLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSignInPage } from './useSignInPage.ts';
import { BrandLogo } from '../../../components/BrandLogo.tsx';
import { CardBody, MainCard } from '../../../components/MainCard.tsx';
import { InputText } from '../../../components/InputText.tsx';
import { ENV } from '../../../constants/env.ts';
import { MdCheck } from 'react-icons/md';

export function SignInPage() {
  const page = useSignInPage();
  const formik = page.formik;
  return (
    <div className={'h-screen grid grid-cols-2'}>
      <div className={'bg-primary-main flex-1 h-full'}></div>
      <div className={' flex flex-col justify-between max-w-md mx-auto w-full h-[80%] my-auto'}>
        <div className={'w-full flex items-center justify-center'}>
          <BrandLogo />
        </div>
        <MainCard>
          <CardBody>
            <p className={'text-xl text-slate-600'}>{t('sign-in-description')}</p>
          </CardBody>
          <Divider />
          <CardBody className={'grid gap-4'}>
            {page.isFromSignUp && (
              <Alert icon={<MdCheck fontSize="inherit" />} severity="success">
                {t('your-registration-is-successfully')}
              </Alert>
            )}
            <InputText
              onEnter={() => formik.handleSubmit()}
              label={t('username')}
              placeholder={t('insert-username')}
              required
              name={'username'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              errorMessage={formik.touched.username && formik.errors.username}
            />
            <InputText
              onEnter={() => formik.handleSubmit()}
              label={t('password')}
              placeholder={t('insert-password')}
              required
              name={'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={page.showPassword ? 'text' : 'password'}
              value={formik.values.password}
              errorMessage={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              defaultChecked={false}
              checked={page.showPassword}
              onChange={(_, e) => page.setShowPassword(e)}
              control={<Checkbox />}
              label={t('show-password')}
            />

            <LoadingButton loading={page.loading} onClick={() => formik.handleSubmit()} variant={'contained'}>
              {t('sign-in')}
            </LoadingButton>
          </CardBody>
        </MainCard>
        <div className={'text-center w-full text-slate-400 italic'}>{ENV.VERSION}</div>
      </div>
    </div>
  );
}
