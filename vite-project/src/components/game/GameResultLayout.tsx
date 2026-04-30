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
                <p>Your final score is <span id="result-final-score">{score}</span></p>
                <p>Average chars number per second - <span id="avearge-chars-per-seconds">{avgCharsNumberPerSecond.toFixed(2)}</span></p>
            </div>
            <StartGame 
                buttonName="Play again"
                onStart={onPLayAgain}
            />
        </>
    )
}