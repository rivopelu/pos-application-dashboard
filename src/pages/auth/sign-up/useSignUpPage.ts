import { useFormik } from 'formik';
import { t } from 'i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ENDPOINT } from '../../../constants/endpoint';
import { IReqSignUp } from '../../../models/request/IReqSignUp';
import { ROUTES } from '../../../routes/route';
import ErrorService from '../../../service/error.service';
import { HttpService } from '../../../service/http.service';

export function useSignUpPage() {
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const initState: IReqSignUp = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmation_password: '',
    business_address: '',
    business_name: '',
  };

  const validationScheme = yup.object().shape({
    name: yup.string().required(t('validation.required', { name: t('name') })),
    username: yup.string().required(t('validation.required', { name: t('username') })),
    password: yup.string().required(t('validation.required', { name: t('password') })),
    email: yup
      .string()
      .required(t('validation.required', { name: t('email') }))
      .email(t('validation.email-not-valid')),
    confirmation_password: yup.string().required(t('validation.required', { name: t('confirmation-password') })),
    business_name: yup.string().required(t('validation.required', { name: t('business-name') })),
    business_address: yup.string().required(t('validation.required', { name: t('business-address') })),
  });

  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      submitSignUp(values);
    },
  });

  function submitSignUp(value: IReqSignUp) {
    setLoadingSubmit(true);
    httpService
      .POST(ENDPOINT.SIGN_UP(), value)
      .then(() => {
        setLoadingSubmit(false);
        onSuccessSignup();
      })
      .catch((e) => {
        setLoadingSubmit(false);
        errorService.fetchApiError(e);
      });
  }

  function onSuccessSignup() {
    navigate(ROUTES.SIGN_IN() + '?signup=true');
  }

  return {
    showPassword,
    setShowPassword,
    loadingSubmit,
    formik,
  };
}
