import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions.ts';
import { MasterDataSlice } from '../reducers/master-data.slice.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse } from '../../models/response/ResponseModel.ts';
import { IResListCategoriesProductList } from '../../models/response/IResListCategoriesProductList.ts';
import { IResListProducts } from '../../models/response/IResListProducts.ts';

export class MasterDataAction extends BaseActions {
  private actions = MasterDataSlice.actions;

  getListCategories() {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.listCategories({ data: undefined, loading: true }));
      await this.httpService
        .GET(ENDPOINT.GET_LIST_CATEGORIES())
        .then((res: BaseResponse<IResListCategoriesProductList[]>) => {
          dispatch(this.actions.listCategories({ loading: false, data: res.data.response_data,  }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
        });
    };
  }



  getListCategoriesPublic(code : string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.listCategories({ data: undefined, loading: true }));
      await this.httpService
        .GET(ENDPOINT.GET_LIST_CATEGORY_PUBLIC(code))
        .then((res: BaseResponse<IResListCategoriesProductList[]>) => {
          dispatch(this.actions.listCategories({ loading: false, data: res.data.response_data,  }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
        });
    };
  }

  getListProduct() {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.listProduct({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_LIST_ALL_PRODUCT())
        .then((res: BaseResponse<IResListProducts[]>) => {
          dispatch(this.actions.listProduct({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.listProduct({ loading: false, data: undefined }));
        });
    };
  }
}
