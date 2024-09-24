import { useState, useEffect } from "react"
import '../css/wordlegame.css'

function WordleGame() {
    const secretWord = 'NINJA'
    const [guesses, setGuesses] = useState(Array.from(Array(6), () => ''))
    const [colors, setColors] = useState(Array.from(Array(6), () => Array(secretWord.length).fill('lightgray')))
    const [currentIndex, setCurrentIndex] = useState(0);
    

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
        
        changeColors(currentIndex, guesses[currentIndex])
        setCurrentIndex(currentIndex+1);
    }

    const changeColors = (rowIndex, guessedWord) => {
        const usedIndices = new Array(24).fill(0);
        for(let i = 0; i < secretWord.length; i++) {
            const letterIndex = secretWord.charCodeAt(i) - 65
            usedIndices[letterIndex] += 1
        }

        const newColors = [...colors]
        for(let i = 0; i < newColors[rowIndex].length; i++){
            const letterIndex = guessedWord.charCodeAt(i) - 65

            if(guesses[rowIndex][i] === secretWord[i]){
                newColors[rowIndex][i] = 'limegreen';
                usedIndices[letterIndex]--
            }
            else if(usedIndices[letterIndex] > 0){
                usedIndices[letterIndex]--
                newColors[rowIndex][i] = 'yellow';
            }
        }
        setColors(newColors);
    }
    
  return (
    <section className="wordlegame">
        {guesses.map((word, i) => {
            return (
            <div className="wordlegame--div" key={i}>
                {Array(secretWord.length).fill('').map((_, j) => {
                    return(
                    <div style={{'--color': colors[i][j]}}className='wordlegame--tile' key={j}>
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