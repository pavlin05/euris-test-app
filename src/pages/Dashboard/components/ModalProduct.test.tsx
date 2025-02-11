import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import ModalProduct from './ModalProduct'
import { Provider } from 'react-redux'
import { store } from '../../../store'

const mockAddProduct = vi.fn()

vi.mock('../../../features/product/query.ts', () => ({
  useAddProductMutation: () => [mockAddProduct, { isLoading: false }],
}))

describe('ModalProduct Component', () => {
  it('renders text input fields correctly', () => {
    const handleClose = vi.fn()
    render(
      <Provider store={store}>
        <ModalProduct isOpen={true} onClose={handleClose} />
      </Provider>,
    )

    const titleModal = screen.getByText('Add new product')
    expect(titleModal).toBeInTheDocument()

    const title = screen.getByText('Title')
    expect(title).toBeInTheDocument()

    const description = screen.getByText('Description')
    expect(description).toBeInTheDocument()

    const price = screen.getByText('Price')
    expect(price).toBeInTheDocument()

    const category = screen.getByText('Category')
    expect(category).toBeInTheDocument()

    const employee = screen.getByText('Employee')
    expect(employee).toBeInTheDocument()

    const reviews = screen.getByText('Review')
    expect(reviews).toBeInTheDocument()
  })

  it('renders filling in form fields correctly', async () => {
    const handleClose = vi.fn()
    render(
      <Provider store={store}>
        <ModalProduct isOpen={true} onClose={handleClose} />
      </Provider>,
    )

    //fill in form fields
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Test Product' },
    })
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Test Description' },
    })
    fireEvent.change(screen.getByPlaceholderText('Price'), {
      target: { value: '100' },
    })
    fireEvent.change(screen.getByPlaceholderText('Category'), {
      target: { value: 'Test Category' },
    })
    fireEvent.change(screen.getByPlaceholderText('Employee'), {
      target: { value: 'Test Employee' },
    })
    fireEvent.change(screen.getByPlaceholderText('Review'), {
      target: { value: 'Great Product' },
    })

    //submit the form
    fireEvent.click(screen.getByText('Send'))

    //check that addProduct is called correctly
    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        title: 'Test Product',
        description: 'Test Description',
        price: 100, // Converted to number
        category: 'Test Category',
        employee: 'Test Employee',
        reviews: ['Great Product'],
      })
    })

    //verify modal closes after submission
    expect(handleClose).toHaveBeenCalled()
  })
})
