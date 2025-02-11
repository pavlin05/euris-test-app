import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import CardProduct from './CardProduct'
import { Product } from '../../../features/product/query.ts'

// Sample product data
const sampleProduct: Product = {
  id: '1234567890abcdef1234',
  title: 'Laptop',
  category: 'Electronics',
  price: 999.99,
  employee: 'John Doe',
  description: 'High performance laptop',
  reviews: ['Great product!', 'Very fast'],
}

//mock hook useRedux
vi.mock('../../../hooks/useRedux.ts', () => ({
  useAppSelector: vi.fn(() => 'grid'),
}))

//mock the ModalDeleteProduct component
vi.mock('./ModalDeleteProduct', () => ({
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="delete-modal">Delete Modal</div> : null,
}))

describe('CardProduct Component', () => {
  it('renders product details correctly and handles delete action', () => {
    render(
      <Provider store={store}>
        <CardProduct product={sampleProduct} />
      </Provider>,
    )

    // Check that the product details are rendered
    const titleProduct = screen.getByText('Laptop')
    expect(titleProduct).toBeInTheDocument()

    const categoryProduct = screen.getByText('Electronics')
    expect(categoryProduct).toBeInTheDocument()

    const priceProduct = screen.getByText('999.99€')
    expect(priceProduct).toBeInTheDocument()

    const employeeProduct = screen.getByText('John Doe')
    expect(employeeProduct).toBeInTheDocument()

    const descriptionProduct = screen.getByText('High performance laptop')
    expect(descriptionProduct).toBeInTheDocument()

    //check if reviews are rendered
    sampleProduct.reviews.forEach((review) => {
      expect(screen.getByText(review)).toBeInTheDocument()
    })

    //simulate clicking the delete button
    fireEvent.click(screen.getByText('Delete'))

    //check that the delete button is rendered
    const deleteButton = screen.getByText('Delete')
    expect(deleteButton).toBeInTheDocument()
  })
})
