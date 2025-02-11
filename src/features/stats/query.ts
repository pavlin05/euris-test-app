import { eurisApi } from '../eurisApi.ts'

export interface Stats {
  numberOfProducts: number
  category: string
}

export const extendedStatsApi = eurisApi.injectEndpoints({
  endpoints: (build) => ({
    getStats: build.query<Stats[], void>({
      providesTags: ['Stats'],
      query: () => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}/stats/categories`,
      }),
    }),
  }),
})

export const { useGetStatsQuery } = extendedStatsApi
