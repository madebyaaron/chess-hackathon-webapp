import { BoardPosition, GameObject, Piece } from '@/types'
import { resolveValidPieceMoves, ensureNewPositionIsValid } from 'src/lib/piece'

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
    // can unit move
    const selectedPiece = action.piece
    const { name, player, position } = selectedPiece
    const targetPosition = action.position

    const isValidMove = ensureNewPositionIsValid(
      name,
      player,
      position,
      targetPosition
    )

    if (!isValidMove) return game

    const newPieces = game.pieces.map(piece => {
      const updatedPiece = { ...piece, position: action.position }
      return piece === selectedPiece ? updatedPiece : piece
    })

    return { ...game, pieces: newPieces, validMoves: [] }
  }

  return game
}
