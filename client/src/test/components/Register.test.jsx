import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Register from '../../features/login/Register'

// Mock the toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('Register Component', () => {
  const mockProps = {
    setRegisterOpen: vi.fn(),
    setPopupOpen: vi.fn(),
    onRegisterSuccess: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('renders register form', () => {
    render(<Register {...mockProps} />)
    
    expect(screen.getByText('Register:')).toBeInTheDocument()
    expect(screen.getByLabelText('Email:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
  })

  it('handles successful registration', async () => {
    const mockResponse = { ok: true, json: () => Promise.resolve({ userId: '123' }) }
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    render(<Register {...mockProps} />)
    
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const registerButton = screen.getByRole('button', { name: 'Register' })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(registerButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
      })
    })
  })

  it('handles registration failure', async () => {
    const mockResponse = { ok: false, json: () => Promise.resolve({ error: 'User already exists' }) }
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    render(<Register {...mockProps} />)
    
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const registerButton = screen.getByRole('button', { name: 'Register' })
    
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(registerButton)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('toggles password visibility', () => {
    render(<Register {...mockProps} />)
    
    const passwordInput = screen.getByLabelText('Password:')
    const eyeButton = screen.getByRole('button', { name: '' }) // Eye button
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    // Click eye button to show password
    fireEvent.click(eyeButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    // Click again to hide password
    fireEvent.click(eyeButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('opens login form when login link is clicked', () => {
    render(<Register {...mockProps} />)
    
    const loginLink = screen.getByText('Login.')
    fireEvent.click(loginLink)
    
    expect(mockProps.setRegisterOpen).toHaveBeenCalledWith(false)
  })
}) 