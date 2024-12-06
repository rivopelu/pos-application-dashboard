import { Dispatch } from '@reduxjs/toolkit';
import { ProductSlice } from '../reducers/product.slice.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse } from '../../models/response/ResponseModel.ts';
import { IResDetailProduct } from '../../models/response/IResDetailProduct.ts';
import BaseActions from '../base-actions.ts';
import { IResListProducts } from '../../models/response/IResListProducts.ts';

export class ProductActions extends BaseActions {
  private action = ProductSlice.actions;

  getDetailProduct(id: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.detailProduct({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.DETAIL_PRODUCT(id))
        .then((res: BaseResponse<IResDetailProduct>) => {
          dispatch(this.action.detailProduct({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.action.detailProduct({ loading: false, data: undefined }));
        });
    };
  }

  getListProductPublic(id: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.listProductPublic({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_PUBLIC_LIST_PRODUCT(id))
        .then((res: BaseResponse<IResListProducts[]>) => {
          dispatch(this.action.listProductPublic({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          dispatch(this.action.listProductPublic({ loading: false, data: undefined }));
          this.errorService.fetchApiError(e);
        });
    };
  }
}
