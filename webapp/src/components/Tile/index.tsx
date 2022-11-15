import "./style.scss"

const players = [{ label: "X" }, { label: "O" }]

const Player: React.FC<{}> = () => (
  <span className="player-o">{players[0].label}</span>
)

const Tile: React.FC<{}> = () => (
  <div className="tile">
    <Player />
  </div>
)

export default Tile
