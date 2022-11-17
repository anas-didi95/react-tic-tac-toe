import "./App.scss"
import Container from "./components/Container"
import Display from "./components/Display"
import Player from "./components/Player"
import Tile from "./components/Tile"
import Title from "./components/Title"
import { useGameContext } from "./utils/contexts/GameContext"

const App: React.FC<{}> = () => {
  const { placeList, turn, hasWinner, playTurn } = useGameContext()

  return (
    <main className="background">
      <Title />
      <Display>
        Player <Player place={turn} />
        's turn
      </Display>
      <Container>
        {placeList.map((place, i) => (
          <Tile key={`tile${i}`} place={place} playTurn={() => playTurn(i)} />
        ))}
      </Container>
      {hasWinner && (
        <Display>
          Player <Player place={turn} /> Won
        </Display>
      )}
    </main>
  )
}

export default App
