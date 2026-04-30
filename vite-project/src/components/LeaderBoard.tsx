import { useState } from 'react'
import './LeaderBoard.css'

type LeaderBoardRow = {
    name: string
    score: number
}

type LeaderBoard = {
    [difficulty: number]: LeaderBoardRow[]
}

interface LeaderBoardProps {
    leaderBoard: LeaderBoard
    clearLeaderBoard: (difficulty: number) => void
}

export default function({ leaderBoard, clearLeaderBoard }: LeaderBoardProps) {
    const [difficulty, setDifficulty] = useState(0)

    return (
        <>
            <div className="difficulty">
                <label htmlFor="difficulty">Difficulty:</label>
                <select name="difficulty" id="leaderboard-difficulty" onChange={(event) => setDifficulty(Number(event.target.value))}>
                    <option value="0">Easy</option>
                    <option value="1">Medium</option>
                    <option value="2">Hard</option>
                </select>
            </div>
            <div className="leaderboard">
                <h2>Leaderboard:</h2>
                <ol id="leaderboard-list">
                    {leaderBoard[difficulty]?.map((row, index) => (
                        <li key={index}>
                            <div className="leaderboard-row">
                                <h3>{row.name}</h3>
                                <h3><span>{row.score}</span> points</h3>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <button id="clear-leaderboard" onClick={() => clearLeaderBoard(difficulty)}>Clear leaderboard</button>
        </>
    )
}