import { createSlice } from '@reduxjs/toolkit';
import { BasePayload, IPayloadData } from '../../models/response/ResponseModel.ts';
import { IResDetailProduct } from '../../models/response/IResDetailProduct.ts';
import { IResListProducts } from '../../models/response/IResListProducts.ts';

export interface IProductSlice {
  detailProduct?: IPayloadData<IResDetailProduct>;
  listProductPublic?: IPayloadData<IResListProducts[]>;
}

const initialState: IProductSlice = {};

export const ProductSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    detailProduct: (state: IProductSlice, action: BasePayload<IResDetailProduct>) => {
      state.detailProduct = action.payload;
    },
    listProductPublic: (state: IProductSlice, action: BasePayload<IResListProducts[]>) => {
      state.listProductPublic = action.payload;
    },
  },
});
