import "./style.scss"

const players = [{ label: "X" }, { label: "O" }]

const Player: React.FC<{ place: number }> = ({ place }) => (
  <span className={place === 0 ? "player-x" : place === 1 ? "player-o" : ""}>
    {place !== -1 && players[place].label}
  </span>
)

export default Player
