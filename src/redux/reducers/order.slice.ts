import { createSlice } from '@reduxjs/toolkit';
import { BasePayload, BasePayloadPaginated, IPayloadData, IPayloadDataPaginated } from '../../models/response/ResponseModel.ts';
import { IResListOrder } from '../../models/response/IResListOrder.ts';

export interface IOrderSlice {
  listOrder?: IPayloadDataPaginated<IResListOrder[]>;
  checkStatusOrder ?: IPayloadData<string>
}

const initState: IOrderSlice = {};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initState,
  reducers: {
    getListOrder: (state: IOrderSlice, action: BasePayloadPaginated<IResListOrder[]>) => {
      state.listOrder = action.payload;
    },
    checkStatusOrder : (state : IOrderSlice, action : BasePayload<string>) => {
      state.checkStatusOrder = action.payload
    }
  },
});
