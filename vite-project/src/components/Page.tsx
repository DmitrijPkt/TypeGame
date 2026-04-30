import { useState } from 'react'
import './Page.css'
import LeaderBoard from './LeaderBoard'
import Game from './game/Game'

type LeaderBoard = {
    [difficulty: number]: LeaderBoardRow[]
}

type LeaderBoardRow = {
    name: string
    score: number
}

interface PageProps {
    header: React.ReactNode
}

interface addToLeaderBoardProps {
    difficulty: number
    name: string
    score: number
}

export default function Page({ header }: PageProps) {
    const [leaderBoard, setLeaderBoard] = useState<LeaderBoard>(() => {
        const saved = localStorage.getItem('leaderboard')
        return saved ? JSON.parse(saved) : { 0: [], 1: [], 2: [] }
    })

    function clearLeaderBoard(difficulty: number) {
        setLeaderBoard(prev => {
            const updated = { ...prev, [difficulty]: [] }
            localStorage.setItem('leaderboard', JSON.stringify(updated))
            return updated
        })
    }

    function addToLeaderBoard({ difficulty, name, score }: addToLeaderBoardProps) {
        setLeaderBoard(prev => {
            const updated = {
                ...prev,
                [difficulty]: [...prev[difficulty], {name, score}]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
            }
            localStorage.setItem('leaderboard', JSON.stringify(updated))
            return updated
        })
    }

    return (
        <div className="page">
            <div className="header">{header}</div>
            <div className="side-panel"><LeaderBoard leaderBoard={leaderBoard} clearLeaderBoard={clearLeaderBoard}/></div>
            <div className="main-panel"><Game 
                addToLeaderboard={addToLeaderBoard}/></div>
        </div>
    )
}