import { useGameContext } from "../../utils/contexts/GameContext"
import "./style.scss"

const players = [{ label: "X" }, { label: "O" }]

const Player: React.FC<{ turn: number }> = ({ turn }) => (
  <span className={turn === 0 ? "player-x" : "player-0"}>
    {players[turn].label}
  </span>
)

const Tile: React.FC<{}> = () => {
  const { turn, playTurn } = useGameContext()

  return (
    <div className="tile" onClick={playTurn}>
      <Player turn={turn} />
    </div>
  )
}

export default Tile
