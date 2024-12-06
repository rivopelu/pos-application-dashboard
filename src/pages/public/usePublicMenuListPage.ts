import { useEffect, useState } from 'react';
import { IResListProducts } from '../../models/response/IResListProducts.ts';
import { ProductActions } from '../../redux/actions/product.actions.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useParams } from 'react-router-dom';
import { IProductSlice } from '../../redux/reducers/product.slice.ts';
import { MasterDataAction } from '../../redux/actions/master-data.actions.ts';
import { IResListCategoriesProductList } from '../../models/response/IResListCategoriesProductList.ts';
import { IMasterDataSlice } from '../../redux/reducers/master-data.slice.ts';
import { HttpService } from '../../service/http.service.ts';
import ErrorService from '../../service/error.service.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { IReqCreateOrderPublic } from '../../models/request/IReqCreateOrderPublic.ts';
import { IReqProductCreateOrder } from '../../models/request/IReqCreateOrder.ts';
import { useDataConstants } from '../../constants/useDataConstants.ts';
import { UiServices } from '../../service/ui.service.ts';
import { t } from 'i18next';
import { OrderActions } from '../../redux/actions/order.actions.ts';
import { IOrderSlice } from '../../redux/reducers/order.slice.ts';

export function usePublicMenuListPage() {
  const productActions = new ProductActions();
  const masterDataActions = new MasterDataAction();
  const orderActions = new OrderActions()
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const uiService = new UiServices()

  const { code } = useParams();
  const dispatch = useAppDispatch();

  
  const product: IProductSlice = useAppSelector((state) => state.Product);
  const masterData: IMasterDataSlice = useAppSelector((state) => state.MasterData);
  const order: IOrderSlice = useAppSelector((state) => state.Order);

  const [dataListProduct, setDataListProduct] = useState<IResListProducts[]>([]);
  const [listCategory, setListCategory] = useState<IResListCategoriesProductList[]>([]);
  const [activeItem, setActiveItem] = useState<IResListProducts | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<IResListProducts[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<IResListCategoriesProductList | undefined>();
  const [rendererData, setRendererData] = useState<IResListProducts[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loadingCheckStatusOrder, setLoadingCheckStatusOrder] = useState<boolean>(true);

  function qtyActiveItem() {
    if (activeItem) {
      const product = selectedProduct.find((e) => e.id === activeItem.id);
      return product?.selected_qty || 0;
    } else {
      return 0;
    }
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

  useEffect(() => {
    setDataListProduct(product?.listProductPublic?.data || []);
    setRendererData(product?.listProductPublic?.data || []);
  }, [product?.listProductPublic?.data]);

  useEffect(() => {
    setListCategory(masterData?.listCategories?.data || []);
  }, [masterData?.listCategories]);

  useEffect(() => {
    if (code) {
      dispatch(productActions.getListProductPublic(code)).then();
      dispatch(masterDataActions.getListCategoriesPublic(code)).then();
      checkStatusOrder()
    }
  }, [code]);

  function checkStatusOrder(){
    if(code){
      dispatch(orderActions.checkStatusOrder(code)).then();
    }
  }

  useEffect(() => {
    setLoadingCheckStatusOrder(order?.checkStatusOrder?.loading || false);
  },[order.checkStatusOrder])

  function onCloseActiveItem() {
    setActiveItem(undefined);
  }

  function onClickCategory(e: IResListCategoriesProductList) {
    if (selectedCategory === e) {
      setSelectedCategory(undefined);
      setRendererData(dataListProduct);
    } else {
      setSelectedCategory(e);
      if (e) {
        const data: IResListProducts[] = dataListProduct.filter((v) => v.category_id === e.id);
        setRendererData(data);
      } else {
        setRendererData(dataListProduct);
      }
    }
  }

  function onClickMin() {
    const e = activeItem;
    if (e) {
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
  }

  function onClickPlus(item ?: IResListProducts) {
    const e = item ||  activeItem;
    if (e) {
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
  }

  function onSubmitProcessOrder() {
    if (code) {
        setLoadingSubmit(true)
      const productData: IReqProductCreateOrder[] = selectedProduct.map((item) => {
        return {
          product_id: item.id,
          qty: item?.selected_qty || 0,
        };
      });

      const data : IReqCreateOrderPublic = {
        code : code,
        tax : useDataConstants().tax,
        products : productData
      }

      httpService
        .POST(ENDPOINT.PROCESS_ORDER_PUBLIC(code), data)
        .then(() => {
          setLoadingSubmit(false);
          setActiveItem(undefined)
          setSelectedProduct([])
          setSelectedCategory(undefined)
          setShowCart(false)
          checkStatusOrder()
          uiService.handleSnackbarSuccess(t("order-success-created"))
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingSubmit(false);
        });
    }
  }

  function onClickItem(e : IResListProducts){
    setActiveItem(e)
    onClickPlus(e)
  }

  return {
    dataListProduct,
    setActiveItem,
    activeItem,
    selectedProduct,
    onCloseActiveItem,
    onClickPlus,
    onClickCategory,
    qtyActiveItem,
    onClickMin,
    listCategory,
    selectedCategory,
    showCart,
    onClickItem,
    setShowCart,
    rendererData,
    totalAmount,
    totalItems,
    loadingSubmit,
    onSubmitProcessOrder,
    loadingCheckStatusOrder
  };
}
