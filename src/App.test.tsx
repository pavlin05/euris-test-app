import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'

// Mock components to focus on App's integration
vi.mock('./components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('./pages/Dashboard', () => ({
  default: () => <div data-testid="dashboard">Dashboard</div>,
}))

vi.mock('./components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}))

describe('App Component', () => {
  it('renders the Header, Dashboard, and Footer components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    // Verify the presence of child components
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
