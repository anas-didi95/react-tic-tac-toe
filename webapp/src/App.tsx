import "./App.scss"
import Container from "./components/Container"
import Tile from "./components/Tile"
import { useGameContext } from "./utils/contexts/GameContext"

const App: React.FC<{}> = () => {
  const { placeList, playTurn } = useGameContext()

  return (
    <main className="background">
      <section className="title">
        <h1>Tic Tac Toe</h1>
      </section>
      <section className="display">
        Player <span className="display-player playerX">X</span>'s turn
      </section>
      <Container>
        {placeList.map((place, i) => (
          <Tile key={`tile${i}`} place={place} playTurn={() => playTurn(i)} />
        ))}
      </Container>
    </main>
  )
}

export default App
