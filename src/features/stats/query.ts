import { eurisApi } from '../eurisApi.ts'

export const extendedStatsApi = eurisApi.injectEndpoints({
  endpoints: (build) => ({
    getStats: build.query<string[], void>({
      providesTags: ['Stats'],
      query: () => ({
        url: `/${import.meta.env.VITE_EURIS_STORE_ID}/stats/categories`,
      }),
    }),
  }),
})

export const { useGetStatsQuery } = extendedStatsApi
