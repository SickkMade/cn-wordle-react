import FullScreenComponent from "./FullScreenComponent"
import { Share2 } from "lucide-react"
import PropTypes from "prop-types";

//prop drilling :sob: i always think it wont grow to the point ot add context yet i suprise myself everytime
function EndGameScreen({copyValue, addTempPopup}) {

    const copy = async () => {
        await navigator.clipboard.writeText(copyValue);
    }
    
    const date = new Date()
  return (
    <FullScreenComponent>
        <h1>Congratulations!</h1>
        <h4>You beat codeninjas wordle on {date.getMonth()}/{date.getDate()} </h4>
        <p>Come back tommorrow for more :)</p>
        <button onClick={()=>{copy(); addTempPopup("Copied");}}className="app--button__main"><span>Share </span><Share2 /></button>
        <img src="mai.WTF.jpg"></img>
        <img src="codeninjamylove.jpeg"></img>
    </FullScreenComponent>
  )
}

EndGameScreen.propTypes = {
    copyValue: PropTypes.string,
    addTempPopup: PropTypes.func,
}


export default EndGameScreen