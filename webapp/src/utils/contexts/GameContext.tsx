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
  const [turn, setTurn] = useState(1)
  const [placeList, setPlaceList] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ])
  const playTurn = (idx: number) => {
    if (placeList[idx] !== -1) {
      return
    }

    const newTurn = (turn + 1) % 2
    setPlaceList((prev) => [
      ...prev.slice(0, idx),
      newTurn,
      ...prev.slice(idx + 1),
    ])
    setTurn(newTurn)
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
