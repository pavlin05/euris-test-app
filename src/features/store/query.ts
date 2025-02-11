import { eurisApi } from '../eurisApi.ts'

export interface Store {
  id?: string
  name: string
  category: string
  employees: string[]
}
export const extendedStoreApi = eurisApi.injectEndpoints({
  endpoints: (build) => ({
    getStores: build.query<Store[], void>({
      query: () => ({
        url: '/',
      }),
      transformResponse: (response: {
        list: { data: Store; id: string }[]
      }): Store[] => {
        const stores = response.list || []
        return stores.map((store) => {
          return {
            id: store.id,
            ...store.data,
          }
        })
      },
    }),
    getStore: build.query<Store, void>({
      query: () => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}`,
      }),
    }),
  }),
})

export const { useGetStoresQuery, useGetStoreQuery } = extendedStoreApi
