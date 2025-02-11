import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import HeaderProduct from './HeaderProduct'
import { Store, useGetStoreQuery } from '../../../features/store/query.ts'

import { setViewLayout } from '../../../features/ui/slice.ts'

const mockStore: Store = {
  name: 'Test Store',
  category: 'Electronics',
  employees: ['John Doe', 'Jane Smith'],
}

vi.mock('../../../features/store/query.ts', async (importActual) => ({
  ...(await importActual()),
  useGetStoreQuery: () => ({
    data: mockStore,
  }),
}))

vi.mock('../../../hooks/useRedux.ts', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => 'grid', // Mock initial layout as 'grid'
}))

vi.mock('../../../features/ui/slice.ts', async (importActual) => ({
  ...(await importActual()),
  setViewLayout: vi.fn(),
}))

describe('HeaderProduct Component', () => {
  it('renders store name and handles view layout toggle', () => {
    const mockHandleModalOpen = vi.fn()
    render(
      <Provider store={store}>
        <HeaderProduct handleModalOpen={mockHandleModalOpen} />
      </Provider>,
    )

    const storeName = screen.getByText('Test Store')
    expect(storeName).toBeInTheDocument()

    const viewToggleButton = screen.getByRole('button', {
      name: 'Add new product',
    })
    expect(viewToggleButton).toBeInTheDocument()

    const layoutToggleButton = screen.getByRole('button', { name: '' })
    expect(layoutToggleButton).toHaveClass('hidden md:block')

    //simulate click on the layout toggle button to change from grid to panel
    fireEvent.click(layoutToggleButton)
    expect(setViewLayout).toHaveBeenCalledWith('panel')

    //simulate clicking "Add new product"
    fireEvent.click(viewToggleButton)
    expect(mockHandleModalOpen).toHaveBeenCalled()

    const { result } = renderHook(() => useGetStoreQuery())
    expect(result.current.data).toEqual(mockStore)
  })
})
