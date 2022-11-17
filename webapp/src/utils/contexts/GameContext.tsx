import { createContext, ReactNode, useContext, useState } from "react"

const initialState = {
  turn: 0,
  placeList: [],
  hasWinner: false,
  playTurn: (idx: number) => {},
}
const GameContext = createContext<{
  turn: number
  placeList: number[]
  hasWinner: boolean
  playTurn: (idx: number) => void
}>(initialState)

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [turn, setTurn] = useState(0)
  const [placeList, setPlaceList] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ])
  const [hasWinner, setHasWinner] = useState(false)
  const playTurn = (idx: number) => {
    if (hasWinner || placeList[idx] !== -1) {
      return
    }
    setPlaceList((prev) => [
      ...prev.slice(0, idx),
      turn,
      ...prev.slice(idx + 1),
    ])
    if (turn === 1) {
      setHasWinner(true)
    } else {
      setTurn((prev) => (prev + 1) % 2)
    }
  }

  return (
    <GameContext.Provider
      value={{
        turn,
        placeList,
        hasWinner,
        playTurn,
      }}>
      {children}
    </GameContext.Provider>
  )
}
const useGameContext = () => useContext(GameContext)

export { useGameContext, GameProvider }
