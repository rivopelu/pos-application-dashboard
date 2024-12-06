import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { HttpService } from '../service/http.service.ts';
import AuthServices from '../service/auth.service.ts';
import { ROUTES } from '../routes/route.ts';
import { IReqSignIn } from '../models/request/IReqSignIn.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { BaseResponse } from '../models/response/ResponseModel.ts';
import ErrorService from '../service/error.service.ts';

export function useSignInPage() {
  const httpService = new HttpService();
  const authService = new AuthServices();
  const navigate = useNavigate();
  const errorService = new ErrorService();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (authService.authCheck()) {
      navigate(ROUTES.HOME());
    }
  }, []);

  const validationScheme = yup.object().shape({
    username: yup.string().required(t('validation.required', { name: t('username') })),
    password: yup.string().required(t('validation.required', { name: t('password') })),
  });
  const initialValues: IReqSignIn = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationScheme,
    onSubmit: (e) => {
      setLoading(true);
      httpService
        .POST(ENDPOINT.SIGN_IN(), e)
        .then((res: BaseResponse<any>) => {
          authService.successLogin(res?.data?.response_data?.access_token);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          errorService.fetchApiError(e);
        });
    },
  });

  return { showPassword, setShowPassword, formik, loading };
}
