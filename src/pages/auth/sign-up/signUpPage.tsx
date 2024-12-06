import { t } from 'i18next';
import { InputText } from '../../../components/InputText';
import { CardBody, MainCard } from '../../../components/MainCard';
import { Checkbox, Divider, FormControlLabel } from '@mui/material';
import { useSignUpPage } from './useSignUpPage';

export function SignUpPage() {
  const page = useSignUpPage();
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
              <InputText label={t('full-name')} placeholder={t('insert-full-name')} required />
              <div className="grid grid-cols-2 gap-4">
                <InputText label={t('email')} placeholder={t('insert-email')} required />
                <InputText label={t('username')} placeholder={t('insert-username')} required />
                <InputText label={t('password')} placeholder={t('insert-password')} required />
                <InputText
                  label={t('confirmation-password')}
                  placeholder={t('insert-confirmation-password')}
                  required
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
            <h1>BOTTOM</h1>
          </CardBody>
        </MainCard>
      </div>
      <div className="bg-primary-main/20 w-[30%]  min-h-screen h-full"></div>
    </div>
  );
}
