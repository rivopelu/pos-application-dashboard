import { t } from 'i18next';
import {
  MdAccountBalanceWallet,
  MdAreaChart,
  MdAssignment,
  MdCategory,
  MdGroup,
  MdHome,
  MdInventory,
  MdPerson,
  MdStore,
  MdTextSnippet,
} from 'react-icons/md';
import { ROUTES } from '../routes/route.ts';
import { ILabelValue } from '../models/feature-type-interface.ts';
import { OrderStatusEnum } from '../enums/order-status-enum.ts';

export function useDataConstants() {
  const tax = 11;
  const sidebarDataList = [
    {
      title: t('home'),
      path: ROUTES.HOME(),
      icon: MdHome,
    },
    {
      title: t('order-list'),
      path: ROUTES.ORDER_LIST(),
      icon: MdAssignment,
    },
    {
      title: t('menu'),
      path: ROUTES.MENU(),
      icon: MdCategory,
    },
    {
      title: t('analytics'),
      path: ROUTES.ANALYTICS(),
      icon: MdAreaChart,
    },
    {
      title: t('report'),
      path: ROUTES.REPORT(),
      icon: MdTextSnippet,
    },
    {
      title: t('master-data'),
      path: ROUTES.MASTER_DATA(),
      icon: MdInventory,
    },
    {
      title: t('subscription'),
      path: ROUTES.SUBSCRIPTION(),
      icon: MdAccountBalanceWallet,
    },
    {
      title: t('account'),
      path: ROUTES.ACCOUNT(),
      icon: MdGroup,
    },
  ];

  const listDataFilterOrderStatus: ILabelValue<OrderStatusEnum>[] = [
    {
      label: t('completed'),
      value: OrderStatusEnum.COMPLETED,
    },
    {
      label: t('created'),
      value: OrderStatusEnum.CREATED,
    },

    {
      label: t('ready'),
      value: OrderStatusEnum.READY,
    },
    {
      label: t('in-progress'),
      value: OrderStatusEnum.IN_PROGRESS,
    },
    {
      label: t('pending'),
      value: OrderStatusEnum.PENDING,
    },
    {
      label: t('request-bill'),
      value: OrderStatusEnum.REQUEST_BILL,
    },
  ];

  const settingMenuList = [
    {
      label: t('account-setting'),
      icon: MdPerson,
      type: 'ACCOUNT',
    },
    {
      label: t('business-setting'),
      icon: MdStore,
      type: 'BUSINESS',
    },
  ];

  return { sidebarDataList, tax, listDataFilterOrderStatus, settingMenuList };
}
