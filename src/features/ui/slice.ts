import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  viewLayout: 'grid' | 'panel'
}

const initialState: UIState = {
  viewLayout: 'panel',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewLayout: (state, action: PayloadAction<'grid' | 'panel'>) => {
      state.viewLayout = action.payload
    },
  },
})

export const { setViewLayout } = uiSlice.actions
export default uiSlice.reducer
