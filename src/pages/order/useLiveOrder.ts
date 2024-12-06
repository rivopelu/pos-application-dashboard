import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Message } from 'stompjs';
import { ENDPOINT } from '../../constants/endpoint';
import { ENV } from '../../constants/env';
import { OrderStatusEnum } from '../../enums/order-status-enum';
import { playOrderNumberSound } from '../../helper/utilsHelper';
import { useWs } from '../../hooks/useWs';
import { IResListOrder } from '../../models/response/IResListOrder';
import { BaseResponse } from '../../models/response/ResponseModel';
import ErrorService from '../../service/error.service';
import { HttpService } from '../../service/http.service';
import { IResDetailOrder } from '../../models/response/IResDetailOrder';
import { ROUTES } from '../../routes/route';

export function useLiveOrder() {
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const ws = useWs();
  const param = useParams();
  const status: OrderStatusEnum = param.status as OrderStatusEnum;
  const location = useLocation();
  const navigate = useNavigate();

  const [dataList, setDataList] = useState<IResListOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<string | undefined>(undefined);
  const [numberOrder, setNumberOrder] = useState<number | undefined>(undefined);
  const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<IResDetailOrder | undefined>();
  const [loadingGetDetail, setLoadingGetDetail] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatusEnum>(status);

  useEffect(() => {
    if (ENV.NODE_ENV === 'DEVELOPMENT') {
      ws.connect();
    } else {
      ws.connect();
    }
  }, []);

  function onChangeFilter(e: OrderStatusEnum) {
    navigate(ROUTES.LIVE_ORDER(e));
    setSelectedStatus(e);
  }

  function fetchData(status: OrderStatusEnum) {
    setLoading(true);
    httpService
      .GET(ENDPOINT.LIVE_ORDER(status))
      .then((res: BaseResponse<IResListOrder[]>) => {
        setDataList(res.data.response_data);
        setLoading(false);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoading(false);
      });
  }

  function onClickComplete(selectedOrder: IResListOrder) {
    if (selectedOrder) {
      setLoadingSubmit(selectedOrder.id);
      httpService
        .PATCH(ENDPOINT.COMPLETE_ORDER(selectedOrder?.id))
        .then(() => {
          fetchData(status);
          setLoadingSubmit(undefined);
        })
        .catch((e) => {
          setLoadingSubmit(undefined);
          errorService.fetchApiError(e);
        });
    }
  }

  useEffect(() => {
    fetchData(status);
  }, [status]);

  function connectWs() {
    setTimeout(() => {
      const clientId = localStorage.getItem('client_id');
      if (ws?.isConnect && ws?.stompClient && clientId && ws?.stompClient?.subscribe) {
        const subscription = ws.stompClient.subscribe(ENDPOINT.WS.LIVE_ORDER(clientId), onMessageReceive);
        return () => {
          subscription.unsubscribe();
        };
      } else {
        return;
      }
    }, 400);
  }

  useEffect(() => {
    connectWs();
  }, [ws]);

  useEffect(() => {
    if (numberOrder) {
      playOrderNumberSound(numberOrder);
    } else {
      return;
    }
  }, [numberOrder]);

  function onMessageReceive(e: Message) {
    const data: number = JSON.parse(e.body);
    fetchData(status);
    if (location.pathname === '/order/live/READY') {
      setNumberOrder(data);
    }
  }

  function onClickDetail(e: IResListOrder) {
    setLoadingGetDetail(true);
    setShowModalDetail(true);
    httpService
      .GET(ENDPOINT.GET_DETAIL_ORDER(e.id))
      .then((res: BaseResponse<IResDetailOrder>) => {
        setLoadingGetDetail(false);
        setDataDetail(res.data.response_data);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoadingGetDetail(false);
        setDataDetail(undefined);
        setShowModalDetail(false);
      });
  }

  function onCloseModalDetail() {
    setShowModalDetail(false);
  }

  return {
    dataList,
    loading,
    loadingSubmit,
    onClickComplete,
    onClickDetail,
    loadingGetDetail,
    dataDetail,
    onChangeFilter,
    selectedStatus,
    showModalDetail,
    onCloseModalDetail,
  };
}
