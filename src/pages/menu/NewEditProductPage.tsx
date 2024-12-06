import { LoadingButton } from '@mui/lab';
import { Checkbox, Divider, FormControlLabel } from '@mui/material';
import { t } from 'i18next';
import { useNewEditProductPage } from './useNewEditProductPage.ts';
import { PageContainer } from '../../components/PageContainer.tsx';
import { CardBody, MainCard } from '../../components/MainCard.tsx';
import { UploadBox } from '../../components/UploadBoxArea.tsx';
import { InputText } from '../../components/InputText.tsx';
import { InputSelect } from '../../components/InputSelect.tsx';
import { InputRupiah } from '../../components/InputRupiah.tsx';
import { InputTextarea } from '../../components/InputTextArea.tsx';

export function NewEditProductPage() {
  const page = useNewEditProductPage();
  const formik = page.formik;

  return (
    <div className="mt-5">
      <PageContainer>
        <div>
          <MainCard>
            <CardBody>
              <p className="text-2xl font-semibold  text-slate-600">{t('please-insert-menu-information')}</p>
            </CardBody>
            <Divider />
            <CardBody>
              <div className="grid gap-5">
                <UploadBox onChange={(e) => formik.setFieldValue('image', e)} values={formik.values.image} />
                <InputText
                  label={t('menu-name')}
                  required
                  placeholder={t('insert-menu-name')}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  errorMessage={formik.touched.name && formik.errors.name}
                />
                <InputSelect
                  required
                  label={t('category')}
                  placeholder={t('insert-category')}
                  onChange={(e) => formik.setFieldValue('category_id', e)}
                  value={formik.values.category_id}
                  options={page.listCategory}
                />
                <InputRupiah
                  label={t('price')}
                  required
                  value={formik.values.price}
                  placeholder={t('insert-price')}
                  name="price"
                  onBlur={formik.handleBlur}
                  onChange={(e) => formik.setFieldValue('price', e.target.value)}
                />
                <InputTextarea
                  label={t('description')}
                  required
                  placeholder={t('insert-description')}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  errorMessage={formik.touched.description && formik.errors.description}
                />
                <FormControlLabel
                  defaultChecked={false}
                  checked={page.onChecked}
                  onChange={(_, e) => page.setOnChecked(e)}
                  control={<Checkbox />}
                  label={t('show-make-sure-data-alert')}
                />
                <LoadingButton
                  loading={page.loadingSubmit}
                  disabled={page.checkValidationButton()}
                  onClick={() => formik.handleSubmit()}
                  variant="contained"
                  size="large"
                >
                  {t('submit')}
                </LoadingButton>
              </div>
            </CardBody>
          </MainCard>
        </div>
      </PageContainer>
    </div>
  );
}
