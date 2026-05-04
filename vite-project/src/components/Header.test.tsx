import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders header with title', () => {
    render(<Header />)
    expect(screen.getByText('Type speeder')).toBeTruthy()
})

test('header title links to home', () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: 'Type speeder' })
    expect(link.getAttribute('href')).toBe('/TypeGame/')
})