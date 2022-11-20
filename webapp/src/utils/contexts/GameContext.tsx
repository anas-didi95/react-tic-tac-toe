import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

const initialState = {
  turn: 0,
  placeList: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  gameDone: false,
  winner: -2,
  playTurn: (idx: number) => {},
  resetGame: () => {},
}
const GameContext = createContext<{
  turn: number
  placeList: number[]
  gameDone: boolean
  winner: number
  playTurn: (idx: number) => void
  resetGame: () => void
}>(initialState)

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [turn, setTurn] = useState(initialState.turn)
  const [placeList, setPlaceList] = useState(initialState.placeList)
  const [gameDone, setGameDone] = useState(initialState.gameDone)
  const [winner, setWinner] = useState(initialState.winner)
  const playTurn = (idx: number) => {
    if (gameDone || placeList[idx] !== -1) {
      return
    }
    setPlaceList((prev) => [
      ...prev.slice(0, idx),
      turn,
      ...prev.slice(idx + 1),
    ])
    setTurn((prev) => (prev + 1) % 2)
  }
  const resetGame = () => {
    setTurn(initialState.turn)
    setPlaceList(initialState.placeList)
    setGameDone(initialState.gameDone)
    setWinner(initialState.winner)
  }

  useEffect(() => {
    if (placeList.indexOf(-1) < 0) {
      setGameDone(true)
      setWinner(-1)
    }
  }, [placeList])

  return (
    <GameContext.Provider
      value={{
        turn,
        placeList,
        gameDone,
        winner,
        playTurn,
        resetGame,
      }}>
      {children}
    </GameContext.Provider>
  )
}
const useGameContext = () => useContext(GameContext)

export { useGameContext, GameProvider }
