import { useState, useEffect } from "react"
import '../css/wordlegame.css'

function WordleGame() {
    const [guesses, setGuesses] = useState(Array.from(Array(6), () => ''))
    const [currentIndex, setCurrentIndex] = useState(0);
    const secretWord = 'NINJA'

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown)

        return () => {
            document.removeEventListener('keydown', detectKeyDown)
        }
    }, [guesses])

    const detectKeyDown = (event) => {
        const currentGuess = guesses[currentIndex];

        const newGuesses = [...guesses];
        if(event.key === 'Backspace'){
            newGuesses[currentIndex] = currentGuess.substring(0, currentGuess.length-1);
        } else if(/^[a-zA-Z]$/.test(event.key) && currentGuess.length < 5){
            newGuesses[currentIndex] += event.key.toUpperCase();
        } else if(event.key === 'Enter' && currentGuess.length === 5){
            submitMessage()
        }
        setGuesses(newGuesses)
    }

    const submitMessage = () => {
        if(currentIndex >= 6) return;
        setCurrentIndex(currentIndex+1);
    }
    
  return (
    <section className="wordlegame">
        {guesses.map((word, i) => {
            return (
            <div className="wordlegame--div" key={i}>
                {Array(secretWord.length).fill('').map((_, j) => {
                    return(
                    <div className="wordlegame--tile" key={j}>
                        <p>{word[j]}</p>
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