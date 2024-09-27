import '../css/wordlekeyboard.css'
import PropTypes from 'prop-types';

function WordleKeyboard({addLetter, yellowWords, greyWords, greenWords}) {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
      ];

      const getColor = (letter) => {
        if(greenWords.includes(letter)){
            return 'wordlekeyboard--key__green'
        }
        else if(yellowWords.includes(letter)){
            return 'wordlekeyboard--key__yellow'
        }
        else if(greyWords.includes(letter)){
            return 'wordlekeyboard--key__grey'
        }
        else return '';
      }

  return (
    <div className='wordlekeyboard'>
        {keys.map((keyarray, i) => {
            return(
            <div className="wordlekeyboard--row" key={i}>
                {keyarray.map((key,i) => {
                    return <button 
                    className={`wordlekeyboard--key ${getColor(key)}`}
                    onClick={addLetter}
                    key={i}>
                        {key}
                    </button>
                })}
                
            </div>
            )
        })}
    </div>
  )
}

WordleKeyboard.propTypes = {
    addLetter: PropTypes.func,
    yellowWords: PropTypes.array,
    greenWords: PropTypes.array,
    greyWords: PropTypes.array,
}

export default WordleKeyboard