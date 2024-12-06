import { IReqProductCreateOrder } from './IReqCreateOrder.ts';

export interface IReqCreateOrderPublic {
  code : string;
  tax : number;
  products: IReqProductCreateOrder[]
}