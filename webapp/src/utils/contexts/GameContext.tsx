import { createContext, ReactNode, useContext, useState } from "react"

const initialState = {
  turn: 0,
  playTurn: () => {},
}
const GameContext = createContext(initialState)

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [turn, setTurn] = useState(0)
  const playTurn = () => setTurn((prev) => (prev + 1) % 2)

  return (
    <GameContext.Provider
      value={{
        turn,
        playTurn,
      }}>
      {children}
    </GameContext.Provider>
  )
}
const useGameContext = () => useContext(GameContext)

export { useGameContext, GameProvider }
