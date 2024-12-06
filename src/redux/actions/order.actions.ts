import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions.ts';
import { orderSlice } from '../reducers/order.slice.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse, BaseResponsePaginated } from '../../models/response/ResponseModel.ts';
import { IResListOrder } from '../../models/response/IResListOrder.ts';

export class OrderActions extends BaseActions {
  private actions = orderSlice.actions;

  checkOrderStatus(code : string){
    return async (dispatch : Dispatch) => {
      dispatch(this.actions.checkStatusOrder({loading : true, data : undefined}))
      await this.httpService.GET(ENDPOINT.CHECK_STATUS_ORDER(code)).then((res : BaseResponse<any>) => {
          dispatch(this.actions.checkStatusOrder({loading : false, data : res.data.response_data.status}))
      })
      .catch(e => {
        this.errorService.fetchApiError(e)
        dispatch(this.actions.checkStatusOrder({loading : false, data : undefined
        }))
      })
    }
  }

  getListOrder(disableLoading?: boolean, param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(
        this.actions.getListOrder({
          loading: !disableLoading,
          data: undefined,
          paginated_data: undefined,
        }),
      );
      await this.httpService
        .GET(ENDPOINT.GET_LIST_ORDER() + (param || ''))
        .then((res: BaseResponsePaginated<IResListOrder[]>) => {
          dispatch(this.actions.getListOrder({ loading: false, data: res.data.response_data, paginated_data : res.data.paginated_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(
            this.actions.getListOrder({
              loading: false,
              data: undefined,
              paginated_data: undefined,
            }),
          );
        });
    };
  }

  checkStatusOrder(code: string) {
    return async (dispatch : Dispatch) =>  {
      dispatch(this.actions.checkStatusOrder({loading : true, data : undefined}))
      await this.httpService.GET(ENDPOINT.CHECK_STATUS_ORDER(code)).then((res : BaseResponse<any>) => {
        dispatch(this.actions.checkStatusOrder({loading : false, data : res.data.response_data.status}))
      }).catch(e => {
      dispatch(this.actions.checkStatusOrder({loading : false, data : undefined}))
        this.errorService.fetchApiError(e)
      })
    }
  }
}
