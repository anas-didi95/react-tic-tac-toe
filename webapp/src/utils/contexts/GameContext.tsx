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
const winList: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
]
const GameContext = createContext(initialState)
const reducer = (state: TState, payload: TPayload): TState => {
  const { action, idx = -1 } = payload
  const { gameDone, placeList, turn, winner } = state
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
      let newGameDone: boolean = gameDone
      let newWinner = winner

      for (let i = 0; i < winList.length && !gameDone; i++) {
        const i1 = winList[i][0]
        const i2 = winList[i][1]
        const i3 = winList[i][2]
        if (
          turn === newPlaceList[i1] &&
          newPlaceList[i1] === newPlaceList[i2] &&
          newPlaceList[i2] === newPlaceList[i3]
        ) {
          newGameDone = true
          newWinner = turn
        }
      }
      if (!newGameDone && newPlaceList.indexOf(-1) < 0) {
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
