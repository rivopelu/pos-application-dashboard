import { createSlice } from '@reduxjs/toolkit';
import {
  BasePayload,
  BasePayloadPaginated,
  IPayloadData,
  IPayloadDataPaginated,
} from '../../models/response/ResponseModel.ts';
import { IResAnalyticsSummary } from '../../models/response/IResAnalyticsSummary.ts';
import { ILabelValue } from '../../models/feature-type-interface.ts';
import { IResSalesReport } from '../../models/response/IResSalesReport.ts';

export interface IAnalyticsSlice {
  summaryOrder?: IPayloadData<IResAnalyticsSummary>;
  chartOrder?: IPayloadData<ILabelValue<number>[]>;
  chartRevenue?: IPayloadData<ILabelValue<number>[]>;
  salesReport?: IPayloadDataPaginated<IResSalesReport[]>;
}

const initState: IAnalyticsSlice = {};

export const AnalyticsSlice = createSlice({
  initialState: initState,
  name: 'analytics',
  reducers: {
    getSummary: (state: IAnalyticsSlice, action: BasePayload<IResAnalyticsSummary>) => {
      state.summaryOrder = action.payload;
    },
    getChartOrder: (state: IAnalyticsSlice, action: BasePayload<ILabelValue<number>[]>) => {
      state.chartOrder = action.payload;
    },
    getChartRevenue: (state: IAnalyticsSlice, action: BasePayload<ILabelValue<number>[]>) => {
      state.chartRevenue = action.payload;
    },
    getSalesReport: (state: IAnalyticsSlice, action: BasePayloadPaginated<IResSalesReport[]>) => {
      state.salesReport = action.payload;
    },
  },
});
