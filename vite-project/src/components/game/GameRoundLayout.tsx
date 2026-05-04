import { useEffect, useRef, useState } from 'react'
import './GameRoundLayout.css'

interface GameRoundLayoutProps {
    word: string
    onWordMatch: () => void
    onTimeEnd: () => void
    score: number,
    updateEnteredCharsNumber: (wordLength: number) => void
    additionalTime: number
}

export default function({word, onWordMatch, onTimeEnd, score, updateEnteredCharsNumber, additionalTime}: GameRoundLayoutProps) {
    const [timeLeft, setTimeLeft] = useState(6)
    const inputRef = useRef<HTMLInputElement>(null)

    function handleChange() {
        if (inputRef.current?.value === word) {
            updateEnteredCharsNumber(word.length)
            inputRef.current.value = ''
            onWordMatch()
            setTimeLeft(prev => prev + additionalTime)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if(timeLeft <= 0) {
            onTimeEnd()
        }
    }, [timeLeft])

    return (
        <>
            <div className="game-info">
                <div className="game-info-time">
                    Time left: <span>{timeLeft}</span>s
                </div>
                <div className="game-info-score">
                    Score: <span>{score}</span>
                </div>
            </div>
            <div className="game-task">
                <p>Type the following:</p>
                <h1 id="game-task"><i>{word}</i></h1>
            </div>
            <div className="game-input">
                <input ref={inputRef} type="text" onChange={handleChange} onPaste={(event) => event.preventDefault()} placeholder="Type the word here..." autoFocus />
            </div>
        </>
    )
}