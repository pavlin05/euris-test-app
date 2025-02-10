import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

const mockDarkModeHandler = vi.fn()
vi.mock('../../hooks/useTheme.tsx', () => ({
  default: () => ({
    theme: 'light',
    darkModeHandler: mockDarkModeHandler, // Use the mocked function
  }),
}))

describe('Header Component', () => {
  it('renders header', () => {
    render(<Header />)

    const headerText = screen.getByText('Euris Test')
    expect(headerText).toBeInTheDocument()

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveClass(
      'bg-transparent border border-gray-300 hover:bg-transparent hover:opacity-60 dark:border-gray-700',
    )

    expect(buttonElement).toBeInTheDocument()
    fireEvent.click(buttonElement)

    expect(mockDarkModeHandler).toHaveBeenCalled()
  })
})
