import { create } from 'zustand'
import { generateBoard } from 'src/lib/board'
import {
  generatePieces,
  resolveValidPieceAttacks,
  resolveValidPieceMoves,
} from 'src/lib/piece'
import { Piece, GameObject, BoardPosition } from '@/types'

export const useGameObjectStore = create((set, get) => ({
  status: `ready`,
  playerTurn: `white`,
  boardRows: generateBoard(),
  pieces: generatePieces(),
  validMoves: [],
  validAttacks: [],
  history: [],
  selectedPiece: (piece: Piece) =>
    set((state: GameObject) => resolveSelectedPiece(piece, state)),
}))

function resolveSelectedPiece(selectedPiece: Piece, state: GameObject) {
  const isPieceSelected = selectedPiece !== undefined

  if (!isPieceSelected) {
    return {
      ...state,
      selectedPiece: undefined,
      validMoves: [],
      validAttacks: [],
    }
  }

  if (selectedPiece?.player !== state.playerTurn) return state

  const doesPieceBelongToCurrentPlayer =
    selectedPiece?.player === state.playerTurn
  if (!doesPieceBelongToCurrentPlayer) return state

  const validMoves: BoardPosition[] = resolveValidPieceMoves(
    selectedPiece,
    state
  )

  const validAttacks: Piece[] = resolveValidPieceAttacks(selectedPiece, state)

  return {
    ...state,
    selectedPiece,
    validMoves,
    validAttacks,
  } as GameObject
}

// example zustand store
// import create from 'zustand'
// import { devtools } from 'zustand/middleware'
//
// const useStore = create(
//   devtools((set, get) => ({
//     count: 0,
//     increment: () => set((state) => ({ count: state.count + 1 })),
//     decrement: () => set((state) => ({ count: state.count - 1 })),
//     reset: () => set({ count: 0 }),
//   }))
// )
//
