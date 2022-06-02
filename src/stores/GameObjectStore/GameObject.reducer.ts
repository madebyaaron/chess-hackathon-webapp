import { BoardPosition, GameObject, Piece } from '@/types'
import { resolveValidPieceMoves } from 'src/lib/piece'

export type ReducerAction =
  | { type: `SELECT`; piece: Piece | undefined }
  | { type: `MOVE`; piece: Piece; position: BoardPosition }

export function gameObjectReducer(
  game: GameObject,
  action: ReducerAction
): GameObject {
  if (action.type === `SELECT`) {
    const selectedPiece = action.piece

    if (selectedPiece === undefined) {
      return { ...game, selectedPiece: undefined, validMoves: [] }
    }

    const { name, player, position } = selectedPiece
    const validMoves: BoardPosition[] = resolveValidPieceMoves(
      name,
      player,
      position
    )

    return { ...game, selectedPiece, validMoves }
  }

  if (action.type === `MOVE`) {
    const newPieces = game.pieces.map(piece => {
      if (piece === action.piece) return { ...piece, position: action.position }
      return piece
    })
    return { ...game, pieces: newPieces, validMoves: [] }
  }

  return game
}
