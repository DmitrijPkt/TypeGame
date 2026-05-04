import { useState } from 'react'
import './StartGame.css'

interface StartGameProps {
    buttonName: string
    onStart: (difficulty: number) => void
    block?: boolean
}

export default function({ buttonName, onStart, block}: StartGameProps) {
    const [difficulty, setDifficulty] = useState(0)

    return(
        <div className="start-game">
            <button onClick={() => {
                if (!block) {
                    onStart(difficulty)
                }}
                } type='submit'>{buttonName}</button>
            <select name="difficulty" onChange={(event) => setDifficulty(Number(event.target.value))}>
                <option value="0">Easy</option>
                <option value="1">Medium</option>
                <option value="2">Hard</option>
            </select>
        </div>
    )
}