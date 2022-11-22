import Player from "../Player"
import "./style.scss"

const Tile: React.FC<{ place: number; playTurn: () => void }> = ({
  place,
  playTurn,
}) => {
  return (
    <div className="tile" onClick={playTurn}>
      <Player place={place} />
    </div>
  )
}

export default Tile
