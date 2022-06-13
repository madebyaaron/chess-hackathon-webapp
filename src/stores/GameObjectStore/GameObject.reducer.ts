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

    const validMoves: BoardPosition[] = resolveValidPieceMoves(selectedPiece)

    return {
      ...game,
      selectedPiece,
      validMoves,
    } as GameObject
  }

  if (MOVE_ACTION) {
    const selectedPiece = action.piece
    const targetPosition = action.position

    if (selectedPiece.position.join(``) === targetPosition.join(``)) return game

    const isValidMove = ensureNewPositionIsValid(selectedPiece, action.position)
    if (!isValidMove) return game

    const updatedPieces = game.pieces.map(piece => {
      const isTargetPiece = piece === selectedPiece
      if (!isTargetPiece) return piece

      return {
        ...piece,
        position: action.position,
        history: [...piece.history, action.position],
      }
    })

    const newPlayer = switchPlayer(game.playerTurn)

    return {
      ...game,
      pieces: updatedPieces,
      validMoves: [],
      playerTurn: newPlayer,
    }
  }

  return game
}
