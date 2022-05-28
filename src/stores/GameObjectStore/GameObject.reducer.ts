import { BoardPosition, GameObject, Piece } from '@/types'

export type ReducerAction =
  | { type: 'SELECT'; piece: Piece | undefined }
  | { type: 'MOVE'; piece: Piece; position: BoardPosition }

export function gameObjectReducer(
  game: GameObject,
  action: ReducerAction
): GameObject {
  if (action.type === 'SELECT') {
    return { ...game, selectedPiece: action.piece }
  }

  if (action.type === 'MOVE') {
    const newPieces = game.pieces.map(piece => {
      if (piece === action.piece) return { ...piece, position: action.position }
      return piece
    })
    return { ...game, pieces: newPieces }
  }

  return game
}
