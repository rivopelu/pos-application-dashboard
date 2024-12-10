import { LoadingButton } from '@mui/lab';
import { Checkbox, Divider, FormControlLabel } from '@mui/material';
import { t } from 'i18next';
import { InputText } from '../../../components/InputText';
import { InputTextarea } from '../../../components/InputTextArea';
import { CardBody, MainCard } from '../../../components/MainCard';
import { useSignUpPage } from './useSignUpPage';

export function SignUpPage() {
  const page = useSignUpPage();
  const formik = page.formik;
  return (
    <div className="flex w-full h-full min-h-screen  ">
      <div className="flex-1 flex items-center justify-center">
        <MainCard>
          <CardBody>
            <h3 className="font-semibold capitalize text-2xl ">{t('account-information')}</h3>
          </CardBody>
          <Divider />
          <CardBody>
            <div className="grid gap-4 min-w-[600px]">
              <InputText
                label={t('full-name')}
                placeholder={t('insert-full-name')}
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.name && formik.errors.name}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputText
                  label={t('email')}
                  placeholder={t('insert-email')}
                  required
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.email && formik.errors.email}
                />
                <InputText
                  label={t('username')}
                  placeholder={t('insert-username')}
                  required
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.username && formik.errors.username}
                />
                <InputText
                  label={t('password')}
                  placeholder={t('insert-password')}
                  required
                  type={page.showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.password && formik.errors.password}
                />
                <InputText
                  label={t('confirmation-password')}
                  placeholder={t('insert-confirmation-password')}
                  required
                  type={page.showPassword ? 'text' : 'password'}
                  name="confirmation_password"
                  value={formik.values.confirmation_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.confirmation_password && formik.errors.confirmation_password}
                />
              </div>
              <FormControlLabel
                defaultChecked={false}
                checked={page.showPassword}
                onChange={(_, e) => page.setShowPassword(e)}
                control={<Checkbox />}
                label={t('show-password')}
              />
            </div>
          </CardBody>
          <Divider />
          <CardBody>
            <h3 className="font-semibold capitalize text-2xl ">{t('business-information')}</h3>
          </CardBody>
          <Divider />
          <CardBody>
            <div className="grid gap-4">
              <InputText
                name="business_name"
                label={t('business-name')}
                placeholder={t('insert-business-name')}
                required
                value={formik.values.business_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.business_name && formik.errors.business_name}
              />
              <InputTextarea
                name="business_address"
                label={t('business-address')}
                placeholder={t('insert-business-address')}
                required
                value={formik.values.business_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.business_address && formik.errors.business_address}
              />
              <LoadingButton loading={page.loadingSubmit} onClick={() => formik.handleSubmit()} variant="contained">
                {t('sign-up')}
              </LoadingButton>
            </div>
          </CardBody>
        </MainCard>
      </div>
      <div className="bg-primary-main/20 w-[30%]  min-h-screen h-full"></div>
    </div>
  );
}
