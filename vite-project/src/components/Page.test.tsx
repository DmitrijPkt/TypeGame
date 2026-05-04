import { render, screen, fireEvent, act } from '@testing-library/react'
import Page from './Page'

beforeEach(() => {
    localStorage.clear()
    globalThis.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve([{ word: 'hello' }])
    } as any)
})

test('player name appears in leaderboard after round finishes', async () => {
    vi.useFakeTimers()

    render(<Page header={<></>} />)

    await act(async () => {})

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jim' } })
    fireEvent.click(screen.getByRole('button', { name: 'Start game' }))

    act(() => {
        vi.advanceTimersByTime(7000)
    })

    expect(screen.getByText('Jim')).toBeTruthy()

    vi.useRealTimers()
})

test('default player score appears in leaderboard after round finnishes', async () => {
    vi.useFakeTimers()

    render(<Page header={<></>} />)

    await act(async () => {})

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jim' } })
    fireEvent.click(screen.getByRole('button', { name: 'Start game' }))

    act(() => {
        vi.advanceTimersByTime(7000)
    })

    const scoreHeading = screen.getByText(/points/)
    const scoreSpan = scoreHeading.querySelector('span')
    expect(scoreSpan?.textContent).toBe('0')

    vi.useRealTimers()
})

test('erned player score appears in leaderboard after round finnishes', async () => {
    vi.useFakeTimers()

    render(<Page header={<></>} />)

    await act(async () => {})

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jim' } })
    fireEvent.click(screen.getByRole('button', { name: 'Start game' }))

    fireEvent.change(screen.getByPlaceholderText('Type the word here...'), { target: { value: "hello" } })

    act(() => {
        vi.advanceTimersByTime(7000 + 6000)
    })

    const scoreHeading = screen.getByText(/points/)
    const scoreSpan = scoreHeading.querySelector('span')
    expect(scoreSpan?.textContent).toBe('4')

    vi.useRealTimers()
})


