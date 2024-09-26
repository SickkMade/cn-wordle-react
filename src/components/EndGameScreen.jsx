import FullScreenComponent from "./FullScreenComponent"
import { Share2 } from "lucide-react"

//prop drilling :sob: i always think it wont grow to the point ot add context yet i suprise myself everytime
function EndGameScreen() {
    const date = new Date()
  return (
    <FullScreenComponent>
        <h1>Congratulations!</h1>
        <h4>You beat codeninjas wordle on {date.getMonth()}/{date.getDate()} </h4>
        <p>Come back tommorrow for more :)</p>
        <button className="app--button__main"><span>Share </span><Share2 /></button>
    </FullScreenComponent>
  )
}


export default EndGameScreen