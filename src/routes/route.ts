import { convertObjToQueryParam, defaultPaginationType } from '../helper/paginationHelper.ts';
import { OrderStatusEnum } from '../enums/order-status-enum.ts';

export const ROUTES = {
  HOME: () => `/`,
  PUBLIC_MENU_LIST_PAGE: (code?: string) => `/public/menu-list/code/${code}`,
  ORDER_LIST: (param?: defaultPaginationType) => '/order-list' + (param ? convertObjToQueryParam(param) : ''),
  SIGN_IN: () => `/sign-in`,
  MENU: () => `/menu`,
  NEW_MENU: () => `/menu/new`,
  MASTER_DATA: () => `/master-data`,
  NEW_CATEGORY: () => `/master-data/category/new`,
  EDIT_CATEGORY: () => `/master-data/category/edit`,
  LIVE_ORDER: (status: OrderStatusEnum | ':status') => `/order/live/${status}`,
  ANALYTICS: () => `/analytics`,
  NEW_ACCOUNT: () => `/account/new`,
  EDIT_PRODUCT: (id: string) => `/menu/edit/${id}`,
  REPORT: (param?: defaultPaginationType) => `/report` + (param ? convertObjToQueryParam(param) : ''),
  NOT_FOUND: () => `*`,
  ACCOUNT: (param?: defaultPaginationType) => `/account` + (param ? convertObjToQueryParam(param) : ''),
};
