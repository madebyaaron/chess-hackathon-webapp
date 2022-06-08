import { BoardPosition, GameObject, Piece } from '@/types'
import { resolveValidPieceMoves, ensureNewPositionIsValid } from 'src/lib/piece'

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

    const { name, player, position, history } = selectedPiece
    const validMoves: BoardPosition[] = resolveValidPieceMoves(
      name,
      player,
      position,
      history
    )

    const isPawnsFirstMove =
      selectedPiece.name === `pawn` && history.length === 1

    const updatedValidMoves = isPawnsFirstMove
      ? adjustPawnValidMovesIfFirstMove(selectedPiece, validMoves)
      : validMoves

    return {
      ...game,
      selectedPiece,
      validMoves: updatedValidMoves,
    } as GameObject
  }

  if (MOVE_ACTION) {
    const selectedPiece = action.piece
    const { name, player, position, history } = selectedPiece
    const targetPosition = action.position

    if (position.join(``) === targetPosition.join(``)) return game

    const isValidMove = ensureNewPositionIsValid(
      name,
      player,
      position,
      targetPosition,
      history
    )

    if (!isValidMove) return game

    const updatedPieces = game.pieces.map(piece => {
      
      const isTargetPiece = piece === selectedPiece
      if (!isTargetPiece) return piece

      return {
        ...piece,
        position: action.position,
        history: [...piece.history, action.position]
      }
    })

    return { ...game, pieces: updatedPieces, validMoves: [] }
  }

  return game
}

export function adjustPawnValidMovesIfFirstMove(
  selectedPiece: Piece,
  validMoves: BoardPosition[]
): BoardPosition[] {
  const extraYCellPosition =
    selectedPiece.player === `black`
      ? validMoves[0][1] + 1
      : validMoves[0][1] - 1

  const pawnFirstValidMoves = [
    validMoves[0],
    [validMoves[0][0], extraYCellPosition],
  ] as BoardPosition[]

  return pawnFirstValidMoves
}
