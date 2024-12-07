import { OrderStatusEnum } from '../enums/order-status-enum.ts';

export const ENDPOINT = {
  WS: {
    LIVE_ORDER: (clientId: string) => '/topic/live/order/' + clientId,
  },
  UPLOAD: '/v1/upload',
  SIGN_IN: () => `/auth/v1/sign-in/admin`,
  SIGN_UP: () => `/auth/v1/sign-up`,
  GET_ME: () => `/account/v1/get-me`,
  GET_LIST_CATEGORIES: () => `/master-data/v1/category/list`,
  NEW_PRODUCT: () => `/product/v1/new`,
  CREATE_NEW_CATEGORY: () => `/master-data/v1/category/new`,
  GET_LIST_ALL_PRODUCT: () => `/master-data/v1/product/list-all`,
  GET_LIST_ORDER: () => `/order/v1/order-list`,
  CREATE_ORDER: () => `/order/v1/create-order`,
  READY_TO_TAKE_ORDER: (id: string) => `/order/v1/order-ready/${id}`,
  COMPLETE_ORDER: (id: string) => `/order/v1/order-complete/${id}`,
  CREATE_ACCOUNT: () => `/account/v1/admin/new-account`,
  LIVE_ORDER: (status: OrderStatusEnum) => `/order/v1/order-list/live?status=${status}`,
  GET_ANALYTICS_SUMMARY: () => `/analytics/v1/summary`,
  DETAIL_PRODUCT: (id: string) => `/product/v1/detail/${id}`,
  EDIT_PRODUCT: (id: string) => `/product/v1/edit/${id}`,
  LIST_ACCOUNT: () => `/account/v1/list`,
  RESET_PASSWORD: (id: string) => `/account/v1/reset-password/${id}`,
  SALES_REPORT: () => `/analytics/v1/sales-report`,
  DOWNLOAD_REPORT: () => `/analytics/v1/download-report`,
  GENERATE_QR_ORDER: () => `/order/v1/generate-qr-order`,
  GET_CHART_ORDER: (startDate: Date, endDate: Date) =>
    `/analytics/v1/chart-order?start-date=${startDate.toDateString()}&end-date=${endDate.toDateString()}`,
  GET_CHART_REVENUE: (startDate: Date, endDate: Date) =>
    `/analytics/v1/chart-revenue?start-date=${startDate.toDateString()}&end-date=${endDate.toDateString()}`,
  GET_PUBLIC_LIST_PRODUCT: (id: string) => `/public/v1/product/list/${id}`,
  GET_LIST_CATEGORY_PUBLIC: (code: string) => `/public/v1/category-list/${code}`,
  PROCESS_ORDER_PUBLIC: (code: string) => `/public/v1/order/create/${code}`,
  CHECK_STATUS_ORDER: (code: string) => `/public/v1/order/check-status/${code}`,
  GET_DETAIL_ORDER: (id: string) => `/order/v1/detail/${id}`,
};
