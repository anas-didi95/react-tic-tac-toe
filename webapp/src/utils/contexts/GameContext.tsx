import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

const initialState = {
  turn: 0,
  placeList: [],
  gameDone: false,
  winner: -2,
  playTurn: (idx: number) => {},
}

const GameContext = createContext<{
  turn: number
  placeList: number[]
  gameDone: boolean
  winner: number
  playTurn: (idx: number) => void
}>(initialState)

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [turn, setTurn] = useState(0)
  const [placeList, setPlaceList] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ])
  const [gameDone, setGameDone] = useState(false)
  const [winner, setWinner] = useState(-99)
  const playTurn = (idx: number) => {
    if (gameDone) {
      return
    }
    if (placeList[idx] !== -1) {
      return
    }
    setPlaceList((prev) => [
      ...prev.slice(0, idx),
      turn,
      ...prev.slice(idx + 1),
    ])
    setTurn((prev) => (prev + 1) % 2)
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
      }}>
      {children}
    </GameContext.Provider>
  )
}
const useGameContext = () => useContext(GameContext)

export { useGameContext, GameProvider }
