import { Product } from "../../../models/product.interface"

export const ProductsRemoteService = {
    getProducts: (results: number, sortBy: string, sortOption: 1 | -1, page: string | null, search?: string): Promise<any> => {
      return fetch(`${process.env.REACT_APP_PRODUCTS}?results=${results}&sortBy=${sortBy}&sortOption=${sortOption}${page !== null? `&page=${page}` : ""}${search? `&search=${search}` : ""}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },

    saveProduct: (product: Product): Promise<any> => {
      return fetch(`${process.env.REACT_APP_PRODUCTS}.product`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({product})
      })
    }
  }