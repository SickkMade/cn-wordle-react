import { useState, useEffect, useMemo } from "react"
import EndGameScreen from "./EndGameScreen"
import WordleKeyboard from "./WordleKeyboard"
import '../css/wordlegame.css'
import words from '../json/words.json'
import correctwords from '../json/correctwords.json'
import HolderOfPopups from "./HolderOfPopups"

//thought it would be a day project so i didnt plan extra componenets
//it turned into a 3 day project and its so ugly please dont look
function WordleGame() {
    const colorMap = {'var(--color-absent)': '⬜', 'var(--color-correct)': '🟩', 'var(--color-present)': '🟨' }
    let day = useMemo(() => new Date(), []);
    const secretWord = correctwords[day.getDate()-1];
    const [guesses, setGuesses] = useState(Array.from(Array(6), () => ''))
    //these three extra states are so emberassing...
    const [yellowWords, setYellowWords] = useState([]);
    const [greenWords, setGreenWords] = useState([]);
    const [greyWords, setGreyWords] = useState([]);
    const [colors, setColors] = useState(Array.from(Array(6), () => Array(secretWord.length).fill('var(--color-absent)')))
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [shake, setShake] = useState(false);
    const [copyValue, setCopyValue] = useState("");


    const [isGameLost, setIsGameLost] = useState(false);

    //its official im ending it all because of how shit this is
    //most hacky soultion. i would say a store but at this point
    //i jsut need planning :sob:
    const [popups, setPopups] = useState([])


    useEffect(() => {

        const gameState = JSON.parse(localStorage.getItem('wordle--gamestate'));
        if(gameState && gameState.day === day.getDate()){
            if(!gameState.isGameOver && !gameState.isGameLost) gameState.guesses[gameState.currentIndex] = ''
            if(gameState.isGameLost) addPopUp(secretWord);
            setGuesses(gameState.guesses)
            setYellowWords(gameState.yellowWords)
            setGreenWords(gameState.greenWords)
            setGreyWords(gameState.greyWords)
            setColors(gameState.colors)
            setCurrentIndex(gameState.currentIndex)
            setIsGameOver(gameState.isGameOver)
            setCopyValue(gameState.copyValue)
            setIsGameLost(gameState.isGameLost)
        }
    }, [])

    useEffect(() => {
        const gameState = {
            day: day.getDate(),
            guesses,
            yellowWords,
            greenWords,
            greyWords,
            colors,
            currentIndex,
            isGameOver,
            copyValue,
            isGameLost,
        }
        localStorage.setItem('wordle--gamestate', JSON.stringify(gameState))
        
    }, [day, guesses, yellowWords, greenWords, greyWords, colors, currentIndex, isGameOver, copyValue, isGameLost])

    useEffect(() => {
        document.addEventListener('keydown', keyboardKeyDown)

        return () => {
            document.removeEventListener('keydown', keyboardKeyDown)
        }
    }, [guesses])

    const addTempPopup = (message) => {
        const newPopup = {
            message,
            id: Date.now(),
        }
        setPopups(lastarr => [...lastarr, newPopup])
        setTimeout(() => removePopup(newPopup.id), 1500)
    }
    const addPopUp = (message) => {
        const newPopup = {
            message,
            id: Date.now(),
        }
        setPopups(lastarr => [...lastarr, newPopup])
    }

    const removePopup = (id) => {
        setPopups(lastarr => lastarr.filter(m => m.id!==id))
    }

    const keyboardKeyDown = (event) => {
        onKeyInput(event.key)
    } 

    const onKeyInput = (key) => {
        if(isGameOver || isGameLost) return;
        if(new Date() - day <= 500) return;

        const currentGuess = guesses[currentIndex];

        const newGuesses = [...guesses];
        if(key === 'Backspace'){
            newGuesses[currentIndex] = currentGuess.substring(0, currentGuess.length-1);
        } else if(/^[a-zA-Z]$/.test(key) && currentGuess.length < 5){
            newGuesses[currentIndex] += key.toUpperCase();
        } else if(key === 'Enter'){
            if(currentGuess.length != 5) {
                shakeRow();
                addTempPopup("Not Enough Letters")
                return;
            }
            submitMessage()
        }
        setGuesses(newGuesses)
    }

    const shakeRow = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500)
    }

    const submitMessage = () => {
        
        if(!words.includes(guesses[currentIndex].toLowerCase())){
            shakeRow();
            addTempPopup("Invalid Word");
            return;
        } else if(currentIndex === 5){
            if(guesses[5] != secretWord){
                setIsGameLost(true);
                addPopUp(secretWord);
            }
        }
        
        changeColors(currentIndex, guesses[currentIndex])
        if(guesses[currentIndex] === secretWord){
            gameOverFunction();
        }
        else if(currentIndex < 5){
            setCurrentIndex(currentIndex+1);
        } 
    }

    const gameOverFunction = () => {
        let temp = "CODENINJA WORDLE -- " + (currentIndex+1) + " /6\n\n"
        colors.forEach((row, i) => {
            if(i <= currentIndex){
                row.forEach((col) => {
                    temp += colorMap[col]
                })
                temp += '\n'
            }
        })
        temp += "https://sickkmade.github.io/cn-wordle-react/"
        setCopyValue(temp)
        setIsGameOver(true);
    }

    const changeColors = (rowIndex, guessedWord) => {
        const letterCount = {};
        const newColors = [...colors];
        const newGrey = [...greyWords]
        const newGreen = [...greenWords]
        const newYellow = [...yellowWords]

        for (let letter of secretWord) {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }

        for(let i = 0; i < newColors[rowIndex].length; i++){
            if(guesses[rowIndex][i] === secretWord[i]){
                newColors[rowIndex][i] = 'var(--color-correct)';
                letterCount[guessedWord[i]]--

                newGreen.push(guessedWord[i]);
            }
        }
        for(let i = 0; i < newColors[rowIndex].length; i++){
            if(newColors[rowIndex][i] === 'var(--color-correct)') continue
            else if(letterCount[guessedWord[i]] > 0){
                newColors[rowIndex][i] = 'var(--color-present)';
                letterCount[guessedWord[i]]--
                
                newYellow.push(guessedWord[i]);
            } else{
                newGrey.push(guessedWord[i]);
            }
        }
        setGreenWords(newGreen);
        setYellowWords(newYellow);
        setGreyWords(newGrey);
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
        if( (isGameOver || isGameLost) && i === currentIndex){
            return 'wordlegame--animation'
        }
        if(word.length > j && i >= currentIndex){
            return 'wordlegame--animation__type'
        }
    }
    
  return (
    <>
    {isGameOver && <img className="wordlegame--img-win" src="codeninjamylove.jpeg"></img>}
    {isGameOver && <EndGameScreen addTempPopup={addTempPopup} copyValue={copyValue}/>}
    <HolderOfPopups popups={popups}/>
    <section className="wordlegame">
        {guesses.map((word, i) => {
            return (
            <div className={`wordlegame--div ${shake && i === currentIndex ? 'wordlegame--div__invalid-animation' : ''}`} key={i}>
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
    <WordleKeyboard addLetter={addLetter} yellowWords={yellowWords} greyWords={greyWords} greenWords={greenWords} />
    </>
  )
}

export default WordleGame

