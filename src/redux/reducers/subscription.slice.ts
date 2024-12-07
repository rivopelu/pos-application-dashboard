import { createSlice } from '@reduxjs/toolkit';
import { IResListSubscription } from '../../models/response/IResListSubscription';
import { BasePayloadPaginated, IPayloadDataPaginated } from '../../models/response/ResponseModel';

export interface ISubscriptionSlice {
  listSubscription?: IPayloadDataPaginated<IResListSubscription[]>;
}

const initState: ISubscriptionSlice = {};

export const SubscriptionSlice = createSlice({
  initialState: initState,
  name: 'subscription',
  reducers: {
    getSubscriptionList: (state: ISubscriptionSlice, action: BasePayloadPaginated<IResListSubscription[]>) => {
      state.listSubscription = action.payload;
    },
  },
});
