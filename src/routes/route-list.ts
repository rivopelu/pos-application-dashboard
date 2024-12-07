import { jsx } from '@emotion/react';
import Element = jsx.JSX.Element;
import { PageTypeEnums } from '../enums/page-type-enums.ts';
import { HomePage } from '../pages/Home/HomePage.tsx';
import { ROUTES } from './route.ts';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import { OrderListPage } from '../pages/order/OrderListPage.tsx';
import { SignInPage } from '../pages/auth/sign-in/SignInPage.tsx';
import { ProductPage } from '../pages/menu/ProductPage.tsx';
import { NewEditProductPage } from '../pages/menu/NewEditProductPage.tsx';
import { MasterDataPage } from '../pages/master-data/MasterDataPage.tsx';
import { NewCategoryPage } from '../pages/master-data/NewCategoryPage.tsx';
import { LiveOrder } from '../pages/order/LiveOrder.tsx';
import { AnalyticsPage } from '../pages/AnalyticsPage.tsx';
import { AccountPage } from '../pages/account/AccountPage.tsx';
import { NewAccountPage } from '../pages/account/NewAccountPage.tsx';
import { ReportPage } from '../pages/report/ReportPage.tsx';
import { PublicMenuListPage } from '../pages/public/PublicMenuListPage.tsx';
import { SignUpPage } from '../pages/auth/sign-up/signUpPage.tsx';
import { SubscriptionPage } from '../pages/subscription/SubscriptionPage.tsx';

export interface IRoutesList {
  element: () => Element;
  type: PageTypeEnums;
  routes: string;
}

export const routesList: IRoutesList[] = [
  {
    element: HomePage,
    routes: ROUTES.HOME(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: NotFoundPage,
    routes: ROUTES.NOT_FOUND(),
    type: PageTypeEnums.FULL_PAGE,
  },
  {
    element: OrderListPage,
    routes: ROUTES.ORDER_LIST(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: SignInPage,
    routes: ROUTES.SIGN_IN(),
    type: PageTypeEnums.FULL_PAGE,
  },
  {
    element: ProductPage,
    routes: ROUTES.MENU(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: NewEditProductPage,
    routes: ROUTES.NEW_MENU(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: MasterDataPage,
    routes: ROUTES.MASTER_DATA(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: NewCategoryPage,
    routes: ROUTES.NEW_CATEGORY(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: NewCategoryPage,
    routes: ROUTES.EDIT_CATEGORY(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: LiveOrder,
    routes: ROUTES.LIVE_ORDER(':status'),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: AnalyticsPage,
    routes: ROUTES.ANALYTICS(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: AccountPage,
    routes: ROUTES.ACCOUNT(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: NewAccountPage,
    routes: ROUTES.NEW_ACCOUNT(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: NewEditProductPage,
    routes: ROUTES.EDIT_PRODUCT(':id'),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: ReportPage,
    routes: ROUTES.REPORT(),
    type: PageTypeEnums.PRIMARY,
  },
  {
    element: PublicMenuListPage,
    routes: ROUTES.PUBLIC_MENU_LIST_PAGE(':code'),
    type: PageTypeEnums.FULL_PAGE,
  },
  {
    element: SignUpPage,
    routes: ROUTES.SIGN_UP(),
    type: PageTypeEnums.FULL_PAGE,
  },
  {
    element: SubscriptionPage,
    routes: ROUTES.SUBSCRIPTION(),
    type: PageTypeEnums.PRIMARY,
  },
];
