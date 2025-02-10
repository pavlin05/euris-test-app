// Footer.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders the footer text correctly', () => {
    render(<Footer />)

    // Verify the footer text is rendered
    const footerText = screen.getByText('@ 2025 Pablo Munoz - Euris Test App')
    expect(footerText).toBeInTheDocument()

    // Verify the footer classes for layout and styling
    const footerElement = screen.getByRole('contentinfo') // 'contentinfo' is a semantic role for footers
    expect(footerElement).toHaveClass(
      'bg-white border border-gray-300 p-5 text-center fixed bottom-0 w-full dark:bg-gray-800 dark:border-gray-700',
    )
  })
})
