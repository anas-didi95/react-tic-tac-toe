import "./App.scss"
import Container from "./components/Container"
import Tile from "./components/Tile"
import { useGameContext } from "./utils/contexts/GameContext"

const App: React.FC<{}> = () => {
  const { placeList, playTurn } = useGameContext()

  return (
    <Container>
      {placeList.map((place, i) => (
        <Tile key={`tile${i}`} place={place} playTurn={() => playTurn(i)} />
      ))}
    </Container>
  )
}

export default App
