import { createSlice } from '@reduxjs/toolkit';
import { IResListCategoriesProductList } from '../../models/response/IResListCategoriesProductList.ts';
import { IResListProducts } from '../../models/response/IResListProducts.ts';
import { BasePayload, IPayloadData } from '../../models/response/ResponseModel.ts';
import { IResSubscriptionPackage } from '../../models/response/IResGetSubscriptionPackage.ts';

export interface IMasterDataSlice {
  listCategories?: IPayloadData<IResListCategoriesProductList[]>;
  listProduct?: IPayloadData<IResListProducts[]>;
  listSubscriptionPackage?: IPayloadData<IResSubscriptionPackage[]>;
}

const initState: IMasterDataSlice = {};

export const MasterDataSlice = createSlice({
  name: 'master-data',
  initialState: initState,
  reducers: {
    listCategories: (state: IMasterDataSlice, action: BasePayload<IResListCategoriesProductList[]>) => {
      state.listCategories = action.payload;
    },
    listProduct: (state: IMasterDataSlice, action: BasePayload<IResListProducts[]>) => {
      state.listProduct = action.payload;
    },
    listSubscriptionPackage: (state: IMasterDataSlice, action: BasePayload<IResSubscriptionPackage[]>) => {
      state.listSubscriptionPackage = action.payload;
    },
  },
});
