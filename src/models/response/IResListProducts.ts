export interface IResListProducts {
  id: string
  name: string
  image: string
  price: number
  stock: number
  category_id : string;
  created_date: number
  created_by: string
  selected_qty?: number
}
