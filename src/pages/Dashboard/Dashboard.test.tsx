import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { store } from '../../store'
import Dashboard from './Dashboard'
import { Product, useGetProductsQuery } from '../../features/product/query.ts'

const mockProducts: Product[] = [
  {
    id: '1234567890abcdef1234',
    title: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    employee: 'John Doe',
    description: 'High performance laptop',
    reviews: ['Great product!', 'Very fast'],
  },
  {
    id: '234567890abcdef12345',
    title: 'Coffee Maker',
    category: 'Home Appliances',
    price: 79.99,
    employee: 'Jane Smith',
    description: 'Brews coffee quickly',
    reviews: ['Easy to use', 'Nice design'],
  },
  {
    id: '34567890abcdef123456',
    title: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    employee: 'Alice Johnson',
    description: 'Latest model smartphone',
    reviews: ['Excellent camera', 'Good battery life'],
  },
]

vi.mock('../../features/product/query.ts', async (importActual) => ({
  ...(await importActual()),
  useGetProductsQuery: () => ({
    data: mockProducts,
  }),
}))

vi.mock('../../hooks/useRedux.ts', () => ({
  useAppSelector: () => 'grid',
}))

vi.mock('./components/CardProduct', () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid={`product-${product.id}`}>{product.title}</div>
  ),
}))

vi.mock('./components/HeaderProduct', () => ({
  default: ({ handleModalOpen }: { handleModalOpen: () => void }) => (
    <button onClick={handleModalOpen}>Open Modal Product</button>
  ),
}))

vi.mock('./components/GraphCategoryProduct', () => ({
  default: () => <div>Graph Category Product</div>,
}))

vi.mock('./components/ModalProduct', () => ({
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? (
      <div data-testid="modal-product">Modal Product is open</div>
    ) : null,
}))

describe('Dashboard Component', () => {
  it('renders display modal', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )

    fireEvent.click(screen.getByText('Open Modal Product'))
    expect(screen.getByTestId('modal-product')).toBeInTheDocument()
  })

  it('render graph category Product', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )

    const categoryText = screen.getByText('Graph Category Product')
    expect(categoryText).toBeInTheDocument()
  })

  it('applies grid style based on view layout', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )

    const layoutDiv = screen.getByTestId('products-layout')
    expect(layoutDiv).toHaveClass(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
    )
  })

  it('render the products', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )
    mockProducts.forEach((product) => {
      expect(screen.getByTestId(`product-${product.id}`)).toBeInTheDocument()
    })

    const { result } = renderHook(() => useGetProductsQuery())
    expect(result.current.data).toBe(mockProducts)
  })
})
