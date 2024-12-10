import { AnalyticsSlice } from './reducers/analytics.slice.ts';
import { MasterDataSlice } from './reducers/master-data.slice.ts';
import { orderSlice } from './reducers/order.slice.ts';
import { AccountSlice } from './reducers/account.slice.ts';
import { ProductSlice } from './reducers/product.slice.ts';
import { SubscriptionSlice } from './reducers/subscription.slice.ts';

export const combineReducers: any = {
  Account: AccountSlice.reducer,
  MasterData: MasterDataSlice.reducer,
  Order: orderSlice.reducer,
  Product: ProductSlice.reducer,
  Analytics: AnalyticsSlice.reducer,
  Subscription: SubscriptionSlice.reducer,
};
