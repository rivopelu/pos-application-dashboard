export interface IReqCreateOrder {
  customer_name?: string
  tax?: number
  is_payment: boolean
  products: IReqProductCreateOrder[]
}

export interface IReqProductCreateOrder {
  product_id: string
  qty: number
}
