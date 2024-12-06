import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { useDataConstants } from '../../constants/useDataConstants.ts';
import { IResListProducts } from '../../models/response/IResListProducts.ts';
import {
  IResListCategoriesProductList,
  mockResponseListCategories,
} from '../../models/response/IResListCategoriesProductList.ts';
import { IReqCreateOrder } from '../../models/request/IReqCreateOrder.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse } from '../../models/response/ResponseModel.ts';
import { IResGenerateQr } from '../../models/response/IResGenerateQr.ts';

export function useHomePage() {
  const dispatch = useAppDispatch();

  const masterDataAction = new MasterDataAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const tax = useDataConstants().tax;

  const [dataProduct, setDataProduct] = useState<IResListProducts[]>([]);
  const [dataCategories, setListCategories] = useState<IResListCategoriesProductList[]>(mockResponseListCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<IResListProducts[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loadingSubmitOrder, setLoadingSubmitOrder] = useState<boolean>(false);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [rendererData, setRendererData] = useState<IResListProducts[]>([]);
  const [showModalGenerateQr, setShowModalGenerateQr] = useState<boolean>(false);
  const [loadingGenerateQr, setLoadingGenerateQr] = useState<boolean>(false);
  const [qrCodeValue, setQrCodeValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    dispatch(masterDataAction.getListCategories()).then();
    dispatch(masterDataAction.getListProduct()).then();
  }, []);

  useEffect(() => {
    setListCategories(masterData?.listCategories?.data || []);
  }, [masterData?.listCategories]);

  useEffect(() => {
    setDataProduct(masterData?.listProduct?.data || []);
    setRendererData(masterData?.listProduct?.data || []);
  }, [masterData?.listProduct]);



  function onClickCategory(e: string) {
    if (selectedCategoryId === e) {
      setSelectedCategoryId(undefined);
      setRendererData(dataProduct);
    } else {
      setSelectedCategoryId(e);
      if (e) {
        const data: IResListProducts[] = dataProduct.filter((v) => v.category_id === e);
        setRendererData(data);
      } else {
        setRendererData(dataProduct);
      }
    }
  }

  function onCloseModal() {
    setOpenModalSuccess(false);
  }

  function onSubmitGenerateQr() {
    setLoadingGenerateQr(true);
    httpService
      .GET(ENDPOINT.GENERATE_QR_ORDER())
      .then((res: BaseResponse<IResGenerateQr>) => {
        setQrCodeValue(res.data.response_data.id);
        setLoadingGenerateQr(false);
      })
      .catch((e) => {
        setLoadingGenerateQr(false);

        errorService.fetchApiError(e);
      });
  }

  function onClickItems(e: IResListProducts) {
    setSelectedProduct((prevSelected) => {
      const productIndex = prevSelected.findIndex((product) => product.id === e.id);

      if (productIndex !== -1) {
        return prevSelected.map((product, index) =>
          index === productIndex
            ? { ...product, selected_qty: (product?.selected_qty ? product.selected_qty : 0) + 1 }
            : product,
        );
      } else {
        return [...prevSelected, { ...e, selected_qty: 1 }];
      }
    });
  }

  function onClickMinItems(e: IResListProducts) {
    setSelectedProduct((prevSelected) => {
      const productIndex = prevSelected.findIndex((product) => product.id === e.id);

      if (productIndex !== -1) {
        return prevSelected
          .map((product, index) =>
            index === productIndex ? { ...product, selected_qty: (product?.selected_qty || 1) - 1 } : product,
          )
          .filter((product) => product.selected_qty && product.selected_qty > 0);
      }

      return prevSelected;
    });
  }

  useEffect(() => {
    let total = 0;
    let items = 0;
    selectedProduct.map((item) => {
      total = total + item.price * (item.selected_qty || 1);
      items = items + (item.selected_qty || 1);
    });
    setTotalAmount(total);
    setTotalItems(items);
  }, [selectedProduct]);

  function createdOrder(data: IReqCreateOrder) {
    setLoadingSubmitOrder(true);
    httpService
      .POST(ENDPOINT.CREATE_ORDER(), data)
      .then(() => {
        setOpenModalSuccess(true);
        setLoadingSubmitOrder(false);
        setSelectedProduct([]);
      })
      .catch((e) => {
        setLoadingSubmitOrder(false);
        errorService.fetchApiError(e);
      });
  }

  function onSubmitPayNow() {
    const data: IReqCreateOrder = {
      is_payment: true,
      tax: tax,
      customer_name: undefined,
      products: selectedProduct.map((item) => {
        return {
          product_id: item.id,
          qty: item.selected_qty || 0,
        };
      }),
    };
    createdOrder(data);
  }

  function onSubmitOpenBill() {
    const data: IReqCreateOrder = {
      is_payment: false,
      tax: tax,
      customer_name: undefined,
      products: selectedProduct.map((item) => {
        return {
          product_id: item.id,
          qty: item.selected_qty || 0,
        };
      }),
    };
    createdOrder(data);
  }

  function onCloseModalGenerateQr() {
    setShowModalGenerateQr(false);
    setQrCodeValue(undefined);
    setLoadingGenerateQr(false);
  }

  return {
    dataProduct,
    dataCategories,
    selectedCategoryId,
    setSelectedCategoryId,
    onClickCategory,
    setSelectedProduct,
    onClickMinItems,
    selectedProduct,
    totalAmount,
    totalItems,
    onSubmitPayNow,
    onClickItems,
    onSubmitGenerateQr,
    rendererData,
    loadingSubmitOrder,
    onCloseModal,
    onSubmitOpenBill,
    qrCodeValue,
    setQrCodeValue,
    openModalSuccess,
    loadingGenerateQr,
    showModalGenerateQr,
    setShowModalGenerateQr,
    onCloseModalGenerateQr,
  };
}
