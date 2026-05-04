import { useState } from 'react'
import './GameStartLayout.css'
import StartGame from './StartGame'

interface GameStartLayoutProps {
    onStartGame: (difficulty: number) => void
    setName: (name: string) => void
}

export default function({onStartGame, setName}: GameStartLayoutProps) {
    const [startGameBlock, setStartGameBlock] = useState(true)

    return (
        <>
            <div className="start-player-name">
                <h1>Enter your name</h1>
                <form>
                    <input type="text" placeholder="Enter your name" autoFocus onChange={ (event) => {
                        setName(event.target.value)
                        setStartGameBlock(event.target.value === '')
                    }}/>
                </form>
            </div>
            <StartGame 
                buttonName='Start game'
                onStart={onStartGame} 
                block={startGameBlock}
            />
        </>
    )
}