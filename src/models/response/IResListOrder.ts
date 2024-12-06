import { OrderStatusEnum } from '../../enums/order-status-enum.ts';

export interface IResListOrder {
  id: string
  order_code: number
  order_status: OrderStatusEnum
  is_payment: boolean
  total_transaction: number
  customer_name: string
  total_items: number
  created_date: number
  created_by: string
}
