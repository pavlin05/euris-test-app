import { RootState } from '../../store.ts'

export const uiSelector = (state: RootState) => state.ui
export const viewLayoutSelector = (state: RootState) => state.ui.viewLayout
