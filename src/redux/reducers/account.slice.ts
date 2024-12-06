import { createSlice } from '@reduxjs/toolkit';
import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from '../../models/response/ResponseModel.ts';
import { IResGetMe } from '../../models/response/IResGetMe.ts';
import { IResListAccont } from '../../models/response/IResListAccount.ts';

const initState: IAccountSlice = {};

export const AccountSlice = createSlice({
  name: 'account',
  initialState: initState,
  reducers: {
    getMe: (state: IAccountSlice, action: BasePayload<IResGetMe>) => {
      state.getMe = action.payload;
    },
    listAccount: (state: IAccountSlice, action: BasePayloadPaginated<IResListAccont[]>) => {
      state.listAccount = action.payload;
    },
  },
});

export interface IAccountSlice {
  getMe?: IPayloadData<IResGetMe>;
  listAccount?: IPayloadDataPaginated<IResListAccont[]>;
}
