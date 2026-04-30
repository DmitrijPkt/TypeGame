import './Game.css'
import GameStartLayout from './GameStartLayout'
import GameRoundLayout from './GameRoundLayout'
import GameResultLayout from './GameResultLayout'
import { useEffect, useRef, useState } from 'react'


type AddToLeaderBoardProps = {
    difficulty: number
    name: string
    score: number
}

interface GameProps {
    //leaderBoard: LeaderBoard
    addToLeaderboard: (props: AddToLeaderBoardProps) => void
}

export default function({ /*leaderBoard,*/ addToLeaderboard }: GameProps) {
    const [gameLayout, setGameLayout] = useState('start')
    const [currentWord, setCurrentWord] = useState('')
    const [score, setScore] = useState(0)
    const [enteredCharsNumber, setEnteredCharsNumber] = useState(0)
    const [difficulty, setDifficulty] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        fetchWord()
    }, [])

    const startTimeRef = useRef<number>(0)
    const avgCharsPerSecond = useRef<number>(0)

    function startGame(difficulty: number) {
        setDifficulty(difficulty);
        setScore(0)
        setEnteredCharsNumber(0)
        startTimeRef.current = Date.now()
        setGameLayout('round')
        console.log(difficulty)
    }

    function fetchWord() {
        fetch('https://random-words-api.kushcreates.com/api?language=en&words=1')
        .then(responce => responce.json())
        .then(data => setCurrentWord(data[0].word))
    }

    function onWordMatch() {
        fetchWord()
        setScore(prev => prev + 4)
    }

    function updateEnteredCharsNumber(wordLength: number) {
        setEnteredCharsNumber(prev => prev + wordLength)
    }

    function endGame() {
        const duration = (Date.now() - startTimeRef.current) / 1000
        avgCharsPerSecond.current = enteredCharsNumber / duration
        setGameLayout('result')
        addToLeaderboard({ difficulty, name, score })
    }

    return (
        <div className="game">
            {gameLayout === 'start' && <GameStartLayout 
                onStartGame={startGame}
                setName={setName}
                />}
            {gameLayout === 'round' && <GameRoundLayout 
                word={currentWord} 
                onWordMatch={onWordMatch} 
                onTimeEnd={endGame}
                score={score}
                updateEnteredCharsNumber={updateEnteredCharsNumber}
                additionalTime={4 - difficulty}
                />}
            {gameLayout === 'result' && <GameResultLayout 
                onPLayAgain={startGame} 
                score={score}
                avgCharsNumberPerSecond={avgCharsPerSecond.current}
                />}
        </div>
    )
}