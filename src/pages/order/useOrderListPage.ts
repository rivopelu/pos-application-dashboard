import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HttpService } from '../../service/http.service.ts';
import { OrderActions } from '../../redux/actions/order.actions.ts';
import ErrorService from '../../service/error.service.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { IOrderSlice } from '../../redux/reducers/order.slice.ts';
import { IResListOrder } from '../../models/response/IResListOrder.ts';
import { defaultPaginatedResponse, IResPaginatedData } from '../../models/response/ResponseModel.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { defaultPaginationType } from '../../helper/paginationHelper.ts';
import { ROUTES } from '../../routes/route.ts';

export function useOrderListPage() {
  const httpService = new HttpService();
  const orderAction = new OrderActions();
  const errorService = new ErrorService();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const order: IOrderSlice = useAppSelector((state) => state.Order);
  const loading = order?.listOrder?.loading;
  const location = useLocation();

  const [dataList, setDataList] = useState<IResListOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IResListOrder | undefined>(undefined);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [paginatedData, setPaginatedData] = useState<IResPaginatedData>(defaultPaginatedResponse);

  function fetchData(param?: string) {
    dispatch(orderAction.getListOrder(false, param)).then();
  }

  useEffect(() => {
    fetchData(location?.search);
  }, [location.search]);

  useEffect(() => {
    setDataList(order?.listOrder?.data || []);
    if (order?.listOrder?.paginated_data) {
      setPaginatedData(order?.listOrder?.paginated_data);
    }
  }, [order?.listOrder]);

  function onClickReadyToTake() {
    if (selectedOrder) {
      setLoadingSubmit(true);
      httpService
        .PATCH(ENDPOINT.READY_TO_TAKE_ORDER(selectedOrder?.id))
        .then(() => {
          fetchData();
          setSelectedOrder(undefined);
          setLoadingSubmit(false);
        })
        .catch((e) => {
          setLoadingSubmit(false);
          errorService.fetchApiError(e);
        });
    }
  }

  function onClickCompleteOrder() {
    if (selectedOrder) {
      setLoadingSubmit(true);
      httpService
        .PATCH(ENDPOINT.COMPLETE_ORDER(selectedOrder?.id))
        .then(() => {
          fetchData();
          setSelectedOrder(undefined);
          setLoadingSubmit(false);
        })
        .catch((e) => {
          setLoadingSubmit(false);
          errorService.fetchApiError(e);
        });
    }
  }

  function onChangePagination(e: defaultPaginationType) {
    navigate(ROUTES.ORDER_LIST(e));
  }

  return {
    dataList,
    setSelectedOrder,
    selectedOrder,
    onClickReadyToTake,
    loading,
    onChangePagination,
    onClickCompleteOrder,
    loadingSubmit,
    paginatedData,
  };
}
