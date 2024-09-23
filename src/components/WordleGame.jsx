import { useState, useEffect } from "react"
import '../css/wordlegame.css'

function WordleGame() {
    const [guesses, setGuesses] = useState(Array.from(Array(6), () => new Array(5).fill(' ')))
    const [currentIndex, setCurrentIndex] = useState(0);
    const secretWord = 'NINJA'

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown)

        return () => {
            document.removeEventListener('keydown', detectKeyDown)
        }
    }, [])

    const detectKeyDown = (event) => {
        const key = event.key;
        // if(key === '')
        console.log(key)
    }
    
  return (
    <section className="wordlegame">
        {guesses.map((row, i) => {
            return (
            <div className="wordlegame--div" key={i}>
                {row.map((letter, j) => {
                    return(
                    <div className="wordlegame--tile" key={j}>
                        <p>{letter}</p>
                    </div>
                    )
                })}
            </div>
            )
        })}
    </section>
    
  )
}

export default WordleGame