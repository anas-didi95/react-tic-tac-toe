import "./App.scss"
import Container from "./components/Container"
import Display from "./components/Display"
import Tile from "./components/Tile"
import Title from "./components/Title"
import { useGameContext } from "./utils/contexts/GameContext"

const App: React.FC<{}> = () => {
  const { placeList, playTurn } = useGameContext()

  return (
    <main className="background">
      <Title />
      <Display />
      <Container>
        {placeList.map((place, i) => (
          <Tile key={`tile${i}`} place={place} playTurn={() => playTurn(i)} />
        ))}
      </Container>
    </main>
  )
}

export default App
