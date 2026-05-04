import './GameResultLayout.css'
import StartGame from "./StartGame"

interface GameResultLayoutProps {
    onPLayAgain: (difficulty: number) => void
    score: number
    avgCharsNumberPerSecond: number
}

export default function({onPLayAgain, score, avgCharsNumberPerSecond}: GameResultLayoutProps) {
    return (
        <>
            <div className="result-info">
                <h1>Time ran out</h1>
                <p>Your final score is <span>{score}</span></p>
                <p>Average chars number per second - <span>{avgCharsNumberPerSecond.toFixed(2)}</span></p>
            </div>
            <StartGame 
                buttonName="Play again"
                onStart={onPLayAgain}
            />
        </>
    )
}