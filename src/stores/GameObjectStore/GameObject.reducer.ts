import { BoardPosition, BoardPositionNode, GameObject, Piece } from '@/types'
import { resolveValidPieceMoves, ensureNewPositionIsValid } from 'src/lib/piece'

export type ReducerAction =
  | { type: `SELECT`; piece: Piece | undefined }
  | { type: `MOVE`; piece: Piece; position: BoardPosition }

export function gameObjectReducer(
  game: GameObject,
  action: ReducerAction
): GameObject {
  const CHESS_PIECE_IS_SELECTED = action.type === `SELECT`
  const CHESS_PIECE_IS_MOVED = action.type === `MOVE`

  if (CHESS_PIECE_IS_SELECTED) {
    const selectedPiece = action.piece
    const isPieceSelected = selectedPiece !== undefined

    if (!isPieceSelected) {
      return { ...game, selectedPiece: undefined, validMoves: [] }
    }

    const { name, player, position, history } = selectedPiece
    const validMoves: BoardPosition[] = resolveValidPieceMoves(
      name,
      player,
      position
    )

    const isPawnsFirstMove =
      selectedPiece.name === `pawn` && history.length === 1

    const extraYCellPosition = (validMoves[0][1] - 1) as BoardPositionNode
    const pawnFirstValidMoves = [
      validMoves[0],
      [validMoves[0][0], extraYCellPosition],
    ] as BoardPosition[]
    const updatedValidMoves = isPawnsFirstMove
      ? pawnFirstValidMoves
      : validMoves

    return {
      ...game,
      selectedPiece,
      validMoves: updatedValidMoves,
    } as GameObject
  }

  if (CHESS_PIECE_IS_MOVED) {
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

    const updatedBoardPosition = game.pieces.map(piece => {
      const updatedPiece = { ...piece, position: action.position }
      const updatePieceMoveHistory = {
        history: [...updatedPiece.history, action.position],
      }
      const hasMoved = piece === selectedPiece

      return hasMoved
        ? {
            ...updatedPiece,
            ...updatePieceMoveHistory,
          }
        : piece
    })

    return { ...game, pieces: updatedBoardPosition, validMoves: [] }
  }

  return game
}
