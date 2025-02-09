import { eurisApi } from '../eurisApi.ts'

export interface Product {
  id?: string
  title: string
  category: string
  price: number
  employee: string
  description: string
  reviews: string[]
}

export const extendedOrderApi = eurisApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      providesTags: ['Products'],
      query: () => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}/products`,
      }),
      transformResponse: (response: {
        list: { data: Product; id: string }[]
      }): Product[] => {
        const products = response.list || []
        return products.map((product) => {
          return {
            id: product.id,
            ...product.data,
          }
        })
      },
    }),
    addProduct: build.mutation<Product, Product>({
      invalidatesTags: ['Products', 'Stats'],
      query: (args) => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}/products`,
        method: 'POST',
        body: args,
      }),
    }),
    deleteProduct: build.mutation<string, string>({
      invalidatesTags: ['Products', 'Stats'],
      query: (productId) => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}/products/${productId}`,
        method: 'DELETE',
      }),
    }),
    getProduct: build.query<Product, string>({
      //providesTags: ['Products'],
      query: (productId) => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}/products/${productId}`,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
} = extendedOrderApi
