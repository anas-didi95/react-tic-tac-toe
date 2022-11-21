import { createContext, ReactNode, useContext, useReducer } from "react"

type TState = {
  turn: number
  placeList: number[]
  gameDone: boolean
  winner: number
}
type TFunction = {
  playTurn: (idx: number) => void
  resetGame: () => void
}
type TContext = TState & TFunction
type TPayload = {
  action: "TURN" | "RESET"
  idx?: number
}

const initialState: TContext = {
  turn: 0,
  placeList: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  gameDone: false,
  winner: -2,
  playTurn: (idx: number) => {},
  resetGame: () => {},
}
const GameContext = createContext(initialState)
const reducer = (state: TState, payload: TPayload): TState => {
  const { action, idx = -1 } = payload
  const { gameDone, placeList, turn } = state
  switch (action) {
    case "TURN":
      if (gameDone || placeList[idx] !== -1) {
        return state
      }

      const newPlaceList = [
        ...placeList.slice(0, idx),
        turn,
        ...placeList.slice(idx + 1),
      ]
      const newTurn = (turn + 1) % 2
      let newGameDone = false
      let newWinner = -2
      if (newPlaceList.indexOf(-1) < 0) {
        newGameDone = true
        newWinner = -1
      }

      return {
        gameDone: newGameDone,
        placeList: newPlaceList,
        turn: newTurn,
        winner: newWinner,
      }
    case "RESET":
      return {
        gameDone: initialState.gameDone,
        placeList: initialState.placeList,
        turn: initialState.turn,
        winner: initialState.winner,
      }
    default:
      throw new Error(`[gameReducer] Action not found! ${action}`)
  }
}

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    turn: initialState.turn,
    placeList: initialState.placeList,
    gameDone: initialState.gameDone,
    winner: initialState.winner,
  })
  const playTurn = (idx: number) => dispatch({ action: "TURN", idx })
  const resetGame = () => dispatch({ action: "RESET" })

  return (
    <GameContext.Provider
      value={{
        ...state,
        playTurn,
        resetGame,
      }}>
      {children}
    </GameContext.Provider>
  )
}
const useGameContext = () => useContext(GameContext)

export { useGameContext, GameProvider }
