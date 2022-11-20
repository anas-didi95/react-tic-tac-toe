import "./App.scss"
import Container from "./components/Container"
import Display from "./components/Display"
import Player from "./components/Player"
import Tile from "./components/Tile"
import Title from "./components/Title"
import { useGameContext } from "./utils/contexts/GameContext"

const App: React.FC<{}> = () => {
  const { placeList, turn, gameDone, winner, playTurn, resetGame } =
    useGameContext()

  return (
    <main className="background">
      <Title />
      <Display>
        {gameDone ? (
          <span>Game End</span>
        ) : (
          <>
            Player <Player place={turn} />
            's turn
          </>
        )}
      </Display>
      <Container>
        {placeList.map((place, i) => (
          <Tile key={`tile${i}`} place={place} playTurn={() => playTurn(i)} />
        ))}
      </Container>
      {gameDone && (
        <>
          <Display>
            {winner < 0 ? (
              <span>Tie</span>
            ) : (
              <>
                Player <Player place={turn} /> Won
              </>
            )}
          </Display>
          <section className="controls">
            <button id="reset" onClick={resetGame}>
              Reset
            </button>
          </section>
        </>
      )}
    </main>
  )
}

export default App
