export interface IResListCategoriesProductList {
  id: string
  name: string
}

export const mockResponseListCategories: IResListCategoriesProductList[] = Array.from({
  length: 4
}).map((_, i) => {
  return {
    name: `category ` + (i + 1),
    id: i.toString()
  }
})
