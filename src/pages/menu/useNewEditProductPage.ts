import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { ProductActions } from '../../redux/actions/product.actions.ts';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import { UiServices } from '../../service/ui.service.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { IProductSlice } from '../../redux/reducers/product.slice.ts';
import { ILabelValue } from '../../models/feature-type-interface.ts';
import { IResDetailProduct } from '../../models/response/IResDetailProduct.ts';
import { IReqNewProduct } from '../../models/request/IReqNewProduct.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { ROUTES } from '../../routes/route.ts';
import { IResListCategoriesProductList } from '../../models/response/IResListCategoriesProductList.ts';

export function useNewEditProductPage() {
  const dispatch = useAppDispatch();

  const masterDataActions = new MasterDataAction();
  const productAction = new ProductActions();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices();

  const navigate = useNavigate();
  const id = useParams()?.id;

  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const product: IProductSlice = useAppSelector((state) => state.Product);
  const [onChecked, setOnChecked] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState<ILabelValue<string>[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<IResDetailProduct | undefined>(undefined);

  const initState: IReqNewProduct = {
    category_id: '',
    description: '',
    image: '',
    name: '',
    price: 0,
  };

  useEffect(() => {
    if (id) {
      dispatch(productAction.getDetailProduct(id)).then();
    }
  }, [id]);

  useEffect(() => {
    if (product?.detailProduct?.data) {
      setDataDetail(product.detailProduct.data);
    }
  }, [product?.detailProduct?.data]);

  const formik = useFormik({
    initialValues: initState,
    onSubmit: (e) => {
      if (id) {
        onSubmitEdit(e);
      } else {
        onSubmitCreate(e);
      }
    },
  });

  function onSubmitCreate(data: IReqNewProduct) {
    setLoadingSubmit(true);
    httpService
      .POST(ENDPOINT.NEW_PRODUCT(), data)
      .then(() => {
        setLoadingSubmit(false);
        navigate(ROUTES.MENU());
        uiService.handleSnackbarSuccess(t('product-create-successfully'));
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoadingSubmit(false);
      });
  }

  function onSubmitEdit(data: IReqNewProduct) {
    if (id) {
      setLoadingSubmit(true);
      httpService
        .PUT(ENDPOINT.EDIT_PRODUCT(id), data)
        .then(() => {
          setLoadingSubmit(false);
          navigate(ROUTES.MENU());
          uiService.handleSnackbarSuccess(t('update-product-successfully'));
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    }
  }

  useEffect(() => {
    if (dataDetail) {
      const data: IReqNewProduct = {
        category_id: dataDetail.category_id,
        description: dataDetail.description,
        image: dataDetail.image,
        name: dataDetail.name,
        price: dataDetail.price,
      };
      formik.setValues(data);
    } else {
      formik.setValues(initState);
    }
  }, [dataDetail]);

  useEffect(() => {
    if (masterData.listCategories?.data) {
      const data = masterData.listCategories.data;
      setListCategory(
        data.map((e: IResListCategoriesProductList) => {
          return {
            value: e.id,
            label: e.name,
          };
        }),
      );
    }
  }, [masterData.listCategories]);

  useEffect(() => {
    dispatch(masterDataActions.getListCategories()).then();
  }, []);

  function checkValidationButton() {
    if (onChecked) {
      return !(formik.values.category_id && formik.values.image && formik.values.price && formik.values.name);
    } else {
      return true;
    }
  }

  return {
    listCategory,
    onChecked,
    loadingSubmit,
    formik,
    checkValidationButton,
    setOnChecked,
  };
}
