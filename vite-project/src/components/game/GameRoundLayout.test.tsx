import { render, screen, act } from '@testing-library/react'                                                                         
import userEvent from '@testing-library/user-event'                                                                                                                                  
import GameRoundLayout from './GameRoundLayout'  

const mockOnWordMatch = vi.fn()
const mockOnTimeEnd = vi.fn()
const mockUpdateEnteredCharsNumber = vi.fn()

beforeEach(() => {
    mockOnWordMatch.mockClear()
})

test('clears input and calls onWordMatch when correct word is typed', async () => {
    render(<GameRoundLayout 
        word='hello'
        onWordMatch={mockOnWordMatch}
        onTimeEnd={mockOnTimeEnd}
        score={0}
        updateEnteredCharsNumber={mockUpdateEnteredCharsNumber}
        additionalTime={4}
        />
    )

    const input = screen.getByPlaceholderText('Type the word here...') as HTMLInputElement
    await userEvent.type(input, 'hello')

    expect(input.value).toBe('')
    expect(mockOnWordMatch).toHaveBeenCalled()
})

test('calls onTimeEnd when time runs out', () => {
    vi.useFakeTimers()

    render(<GameRoundLayout 
        word='hello'
        onWordMatch={mockOnWordMatch}
        onTimeEnd={mockOnTimeEnd}
        score={0}
        updateEnteredCharsNumber={mockUpdateEnteredCharsNumber}
        additionalTime={4}
        />
    )

    act(() => {
        vi.advanceTimersByTime(7000)
    })

    expect(mockOnTimeEnd).toHaveBeenCalled()

    vi.useRealTimers()
})