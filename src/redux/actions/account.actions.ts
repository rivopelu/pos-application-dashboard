import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions.ts';
import { AccountSlice } from '../reducers/account.slice.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse, BaseResponsePaginated } from '../../models/response/ResponseModel.ts';
import { IResGetMe } from '../../models/response/IResGetMe.ts';
import { IResListAccont } from '../../models/response/IResListAccount.ts';

export class AccountActions extends BaseActions {
  private actions = AccountSlice.actions;
  getMe() {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getMe({ data: undefined, loading: false }));
      await this.httpService
        .GET(ENDPOINT.GET_ME())
        .then((res: BaseResponse<IResGetMe>) => {
          console.log(res.data);
          localStorage.setItem('client_id', res.data.response_data.client_id);
          dispatch(this.actions.getMe({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getMe({ data: undefined, loading: false }));
        });
    };
  }

  getListAccount(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.listAccount({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.LIST_ACCOUNT() + (param || ''))
        .then((res: BaseResponsePaginated<IResListAccont[]>) => {
          dispatch(
            this.actions.listAccount({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          dispatch(this.actions.listAccount({ loading: false, data: undefined }));
          this.errorService.fetchApiError(e);
        });
    };
  }
}
