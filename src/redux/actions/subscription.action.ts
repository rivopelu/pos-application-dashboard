import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions';
import { SubscriptionSlice } from '../reducers/subscription.slice';
import { ENDPOINT } from '../../constants/endpoint';
import { BaseResponsePaginated } from '../../models/response/ResponseModel';
import { IResListSubscription } from '../../models/response/IResListSubscription';

export class SubscriptionActions extends BaseActions {
  private action = SubscriptionSlice.actions;
  getSubscription(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.getSubscriptionList({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_SUBSCRIPTION() + (param || ''))
        .then((res: BaseResponsePaginated<IResListSubscription[]>) => {
          dispatch(
            this.action.getSubscriptionList({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.getSubscriptionList({ loading: false, data: undefined }));
        });
    };
  }
}
