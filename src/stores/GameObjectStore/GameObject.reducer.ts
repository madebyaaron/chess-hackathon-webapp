import { BoardPosition, GameObject, Piece } from '@/types'
import { resolveValidPieceMoves, ensureNewPositionIsValid } from 'src/lib/piece'
import { switchPlayer } from 'src/utils/switchPlayer'

export type ReducerAction =
  | { type: `SELECT`; piece: Piece | undefined }
  | { type: `MOVE`; piece: Piece; position: BoardPosition }

export function gameObjectReducer(
  game: GameObject,
  action: ReducerAction
): GameObject {
  const SELECT_ACTION = action.type === `SELECT`
  const MOVE_ACTION = action.type === `MOVE`

  if (SELECT_ACTION) {
    const selectedPiece = action.piece
    const isPieceSelected = selectedPiece !== undefined

    if (!isPieceSelected) {
      return { ...game, selectedPiece: undefined, validMoves: [] }
    }

    const doesPieceBelongToCurrentPlayer =
      selectedPiece?.player === game.playerTurn
    if (!doesPieceBelongToCurrentPlayer) return game

    const validMoves: BoardPosition[] = resolveValidPieceMoves(
      selectedPiece,
      game
    )

    return {
      ...game,
      selectedPiece,
      validMoves,
    } as GameObject
  }

  if (MOVE_ACTION) {
    const selectedPiece = action.piece
    const targetPosition = action.position

    const isTargetPositionSameAsCurrentPosition =
      selectedPiece.position.join(``) === targetPosition.join(``)
    if (isTargetPositionSameAsCurrentPosition) return game

    const isValidMove = ensureNewPositionIsValid(
      selectedPiece,
      action.position,
      game
    )

    if (!isValidMove) return game

    const pieces = game.pieces.map(piece => {
      const isTargetPiece = piece === selectedPiece
      if (!isTargetPiece) return piece

      return {
        ...piece,
        position: action.position,
        history: [...piece.history, action.position],
      }
    })

    const playerTurn = switchPlayer(game.playerTurn)

    return {
      ...game,
      selectedPiece: undefined,
      pieces,
      validMoves: [],
      playerTurn,
    }
  }

  return game
}
