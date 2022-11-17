import { createContext, ReactNode, useContext, useState } from "react"

const initialState = {
  turn: 0,
  placeList: [],
  playTurn: (idx: number) => {},
}
const GameContext = createContext<{
  turn: number
  placeList: number[]
  playTurn: (idx: number) => void
}>(initialState)

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [turn, setTurn] = useState(0)
  const [placeList, setPlaceList] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ])
  const playTurn = (idx: number) => {
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

  return (
    <GameContext.Provider
      value={{
        turn,
        placeList,
        playTurn,
      }}>
      {children}
    </GameContext.Provider>
  )
}
const useGameContext = () => useContext(GameContext)

export { useGameContext, GameProvider }
