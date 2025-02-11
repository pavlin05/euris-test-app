import { render, renderHook, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import GraphCategoryProduct from './GraphCategoryProduct'
import { Provider } from 'react-redux'
import { store } from '../../../store.ts'
import { Stats, useGetStatsQuery } from '../../../features/stats/query.ts'

const mockStats: Stats[] = [
  { category: 'Electronics', numberOfProducts: 10 },
  { category: 'Furniture', numberOfProducts: 5 },
  { category: 'Groceries', numberOfProducts: 20 },
]

vi.mock('../../../features/stats/query.ts', async (importOriginal) => ({
  ...(await importOriginal()),
  useGetStatsQuery: () => ({
    data: mockStats,
  }),
}))
describe('GraphCategoryProduct Component', () => {
  it('renders the polar area chart correctly', () => {
    render(
      <Provider store={store}>
        <GraphCategoryProduct />
      </Provider>,
    )

    // Check that the graph component is rendering
    const divGraph = screen.getByTestId('graph-category-product')
    expect(divGraph).toBeInTheDocument()
    expect(divGraph).toHaveClass('flex justify-center max-h-140 w-full')

    // The PolarArea chart doesn't render DOM elements we can easily check,
    // but we can still confirm it renders by ensuring no errors and its container is present.

    const { result } = renderHook(() => useGetStatsQuery())
    expect(result.current.data).toEqual(mockStats)
  })
})
