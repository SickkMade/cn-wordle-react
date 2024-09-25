import '../css/wordlekeyboard.css'
import PropTypes from 'prop-types';

function WordleKeyboard({addLetter}) {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
      ];

  return (
    <div className='wordlekeyboard'>
        {keys.map((keyarray, i) => {
            return(
            <div className="wordlekeyboard--row" key={i}>
                {keyarray.map((key,i) => {
                    return <button 
                    className="wordlekeyboard--key"
                    onClick={addLetter} 
                    key={i}>{key}
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
}

export default WordleKeyboard