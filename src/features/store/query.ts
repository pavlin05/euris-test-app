import { eurisApi } from '../eurisApi.ts'

export const extendedStoreApi = eurisApi.injectEndpoints({
  endpoints: (build) => ({
    getStores: build.query<string[], void>({
      query: () => ({
        url: '/',
      }),
    }),
    getStore: build.query<string, string>({
      query: () => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}`,
      }),
    }),
  }),
})

export const { useGetStoresQuery, useGetStoreQuery } = extendedStoreApi
