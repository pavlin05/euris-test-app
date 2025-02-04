import { configureStore } from '@reduxjs/toolkit'
import { eurisApi } from './features/eurisApi.ts'

export const store = configureStore({
  reducer: {
    [eurisApi.reducerPath]: eurisApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eurisApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
