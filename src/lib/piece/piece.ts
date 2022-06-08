import { piecesInitialState } from './../../constants/piecesInitialState'
import { BoardPosition, Piece } from '@/types'

export function generatePieces(): Piece[] {
  return piecesInitialState
}

export function resolveValidPieceMoves(piece: Piece): BoardPosition[] {
  const isPiecesFirstMove = piece.history.length === 1
  const movementRange = isPiecesFirstMove
    ? piece.initialMovementRange
    : piece.movementRange
  const validMoves = movementRange.map(range => {
    const [x, y] = piece.position
    const [top, right, bottom, left] = range
    const yDistance = top - bottom
    const xDistance = right - left
    return [x + xDistance, y + yDistance]
  })

  return validMoves as BoardPosition[]
}

export function ensureNewPositionIsValid(
  piece: Piece,
  position: BoardPosition
) {
  const validPieceMoves = resolveValidPieceMoves(piece)
  const doesValidMovesIncludeNewPosition = validPieceMoves.some(
    move => move[0] === position[0] && move[1] === position[1]
  )
  return doesValidMovesIncludeNewPosition
}
