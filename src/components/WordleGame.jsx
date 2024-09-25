import { useState, useEffect } from "react"
import WordleKeyboard from "./WordleKeyboard"
import '../css/wordlegame.css'

function WordleGame() {
    const secretWord = 'NINJA'
    const [guesses, setGuesses] = useState(Array.from(Array(6), () => ''))
    const [colors, setColors] = useState(Array.from(Array(6), () => Array(secretWord.length).fill('var(--color-absent)')))
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    

    const  checkWord = async (word) => {
        const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)
        return response.status
    }

    useEffect(() => {
        document.addEventListener('keydown', keyboardKeyDown)

        return () => {
            document.removeEventListener('keydown', keyboardKeyDown)
        }
    }, [guesses])

    const keyboardKeyDown = (event) => {
        onKeyInput(event.key)
    } 

    const onKeyInput = (key) => {
        if(isGameOver) return;

        const currentGuess = guesses[currentIndex];

        const newGuesses = [...guesses];
        if(key === 'Backspace'){
            newGuesses[currentIndex] = currentGuess.substring(0, currentGuess.length-1);
        } else if(/^[a-zA-Z]$/.test(key) && currentGuess.length < 5){
            newGuesses[currentIndex] += key.toUpperCase();
        } else if(key === 'Enter' && currentGuess.length === 5){
            submitMessage()
        }
        setGuesses(newGuesses)
    }

    const submitMessage = () => {
        if(currentIndex >= 6 || !checkWord(guesses[currentIndex])) return;
        
        changeColors(currentIndex, guesses[currentIndex])
        if(guesses[currentIndex] === secretWord){
            setIsGameOver(true);
        }
        else if(currentIndex <= 5){
            setCurrentIndex(currentIndex+1);
        }
    }

    const changeColors = (rowIndex, guessedWord) => {
        const letterCount = {};
        const newColors = [...colors];

        for (let letter of secretWord) {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }

        for(let i = 0; i < newColors[rowIndex].length; i++){
            if(guesses[rowIndex][i] === secretWord[i]){
                newColors[rowIndex][i] = 'var(--color-correct)';
                letterCount[guessedWord[i]]--
            }
        }
        for(let i = 0; i < newColors[rowIndex].length; i++){
            if(newColors[i] === 'var(--color-correct)') continue

            if(letterCount[guessedWord[i]] > 0){
                newColors[rowIndex][i] = 'var(--color-present)';
                letterCount[guessedWord[i]]--
            }
        }
        setColors(newColors);
    }

    const addLetter = (event) => {
        let input = event.target.innerText
        onKeyInput(input);
    }

    const applyAnimations = (i, j, word) => {
        if( i < currentIndex ){
            return 'wordlegame--animation'
        }
        if(isGameOver && i === currentIndex){
            return 'wordlegame--animation'
        }
        if(word.length > j && i >= currentIndex){
            return 'wordlegame--animation__type'
        }
    }
    
  return (
    <>
    <section className="wordlegame">
        {guesses.map((word, i) => {
            return (
            <div className="wordlegame--div" key={i}>
                {Array(secretWord.length).fill('').map((_, j) => {
                    return(
                    <div 
                        style={{'--color': colors[i][j], '--animation-order': j}}
                        className={
                            `wordlegame--tile 
                            ${applyAnimations(i, j, word)}
                            ${word[j] ? 'wordlegame--tile__dark-border' : ''}
                            `} 
                        key={j} 
                    >
                        <p>{word[j]}</p>
                    </div>
                    )
                })}
            </div>
            )
        })}
    </section>
    <WordleKeyboard addLetter={addLetter} />
    </>
  )
}

export default WordleGame