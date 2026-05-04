import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from './Game'
import { act } from 'react'

const mockAddToLeaderboard = vi.fn()

beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve([{ word: 'hello'}])
    } as any)
})

test('shows start screen by default', () => {
    render(<Game addToLeaderboard={mockAddToLeaderboard} />)
    expect(screen.getByText('Enter your name')).toBeTruthy()
})

test('clicking start game moves to round screen', async () => {
    render(<Game addToLeaderboard={mockAddToLeaderboard} />)

    await userEvent.type(screen.getByPlaceholderText("Enter your name"), 'Jim')
    await userEvent.click(screen.getByRole('button', { name: 'Start game'}))

    expect(screen.getByText('hello')).toBeTruthy()
})


test('shows result screen after time runs out', async () => {
    vi.useFakeTimers()

    render(<Game addToLeaderboard={mockAddToLeaderboard} />)

    await act(async () => {})

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jim' } })
    fireEvent.click(screen.getByRole('button', { name: 'Start game'}))

    act(() => {
        vi.advanceTimersByTime(7000)
    })

    expect(screen.getByText('Time ran out')).toBeTruthy()

    vi.useRealTimers()
})
