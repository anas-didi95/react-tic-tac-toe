import Player from "../Player"
import "./style.scss"

const Display: React.FC<{ turn: number }> = ({ turn }) => (
  <section className="display">
    Player <Player place={turn} />
    's turn
  </section>
)

export default Display
