// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// initialize an empty api service that we'll inject endpoints into later as needed
export const eurisApi = createApi({
  reducerPath: 'eurisApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_EURIS_API_URL}/api/stores`,
  }),
  endpoints: () => ({}),
  tagTypes: ['Products', 'Stores', 'Stats'],
})
