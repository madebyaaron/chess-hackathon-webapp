import { piecesInitialState } from './../../constants/piecesInitialState'
import { BoardPosition, GameObject, Piece } from '@/types'

export function generatePieces(): Piece[] {
  return piecesInitialState
}

export function resolveValidPieceMoves(
  piece: Piece,
  game: GameObject
): BoardPosition[] {
  const allUnselectedPiecePositions = game.pieces
    .filter(p => p !== piece)
    .map(p => p.position.join(``))

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

  const unobstructedValidMoves = validMoves.filter(
    move => !allUnselectedPiecePositions.includes(move.join(``))
  )

  return unobstructedValidMoves as BoardPosition[]
}

export function ensureNewPositionIsValid(
  piece: Piece,
  position: BoardPosition,
  game: GameObject
) {
  const validPieceMoves = resolveValidPieceMoves(piece, game)
  const doesValidMovesIncludeNewPosition = validPieceMoves.some(
    move => move[0] === position[0] && move[1] === position[1]
  )
  return doesValidMovesIncludeNewPosition
}
