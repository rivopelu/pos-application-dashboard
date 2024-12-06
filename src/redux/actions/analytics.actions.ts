import { Dispatch } from '@reduxjs/toolkit';
import BaseActions from '../base-actions';
import { AnalyticsSlice } from '../reducers/analytics.slice';
import { ENDPOINT } from '../../constants/endpoint.ts';
import { BaseResponse, BaseResponsePaginated } from '../../models/response/ResponseModel.ts';
import { IResAnalyticsSummary } from '../../models/response/IResAnalyticsSummary.ts';
import { ILabelValue } from '../../models/feature-type-interface.ts';
import { IResSalesReport } from '../../models/response/IResSalesReport.ts';

export class AnalyticsActions extends BaseActions {
  private actions = AnalyticsSlice.actions;

  getSummary() {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getSummary({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_ANALYTICS_SUMMARY())
        .then((res: BaseResponse<IResAnalyticsSummary>) => {
          dispatch(this.actions.getSummary({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getSummary({ loading: false, data: undefined }));
        });
    };
  }

  getChartOrder(startDate: Date, endDate: Date) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getChartOrder({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_CHART_ORDER(startDate, endDate))
        .then((res: BaseResponse<ILabelValue<number>[]>) => {
          dispatch(this.actions.getChartOrder({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getChartOrder({ loading: false, data: undefined }));
        });
    };
  }
  getChartRevenue(startDate: Date, endDate: Date) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getChartOrder({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.GET_CHART_REVENUE(startDate, endDate))
        .then((res: BaseResponse<ILabelValue<number>[]>) => {
          dispatch(this.actions.getChartRevenue({ loading: false, data: res.data.response_data }));
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getChartRevenue({ loading: false, data: undefined }));
        });
    };
  }
  getSalesReport(param?: string) {
    return async (dispatch: Dispatch) => {
      dispatch(this.actions.getSalesReport({ loading: true, data: undefined }));
      await this.httpService
        .GET(ENDPOINT.SALES_REPORT() + (param || ''))
        .then((res: BaseResponsePaginated<IResSalesReport[]>) => {
          dispatch(
            this.actions.getSalesReport({
              loading: false,
              data: res.data.response_data,
              paginated_data: res.data.paginated_data,
            }),
          );
        })
        .catch((e) => {
          this.errorService.fetchApiError(e);
          dispatch(this.actions.getSalesReport({ loading: false, data: undefined }));
        });
    };
  }
}
