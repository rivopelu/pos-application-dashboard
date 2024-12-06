
export interface IResDetailOrder {
    id : string;
    code : number;
    status : string;
    products : IResProductDetailOrder[]
}

export interface IResProductDetailOrder {
    id : string;
    name : string;
    qty : number;
    price : number;
}