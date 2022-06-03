import { piecesInitialState } from './../../constants/piecesInitialState'
import {
  BoardPosition,
  Piece,
  PieceName,
  PlayerColor,
  PieceDefinitions,
} from '@/types'
import {
  knightMovementRange,
  kingMovementRange,
  rookMovementRange,
  bishopMovementRange,
  queenMovementRange,
} from 'src/constants/movementRanges'

export function generatePieces(): Piece[] {
  return piecesInitialState
}

const pieceDefinitions: PieceDefinitions[] = [
  {
    name: `pawn`,
    movementRange: [[1, 0, 0, 0]],
  },
  {
    name: `knight`,
    movementRange: knightMovementRange,
  },
  {
    name: `king`,
    movementRange: kingMovementRange,
  },
  {
    name: `rook`,
    movementRange: rookMovementRange,
  },
  {
    name: `bishop`,
    movementRange: bishopMovementRange,
  },
  {
    name: `queen`,
    movementRange: queenMovementRange,
  },
]

export function resolvePieceDefinition(name: PieceName) {
  return pieceDefinitions.find(p => p.name === name)
}

export function resolveValidPieceMoves(
  name: PieceName,
  player: PlayerColor,
  position: BoardPosition
) {
  const yModifier = player === `black` ? 1 : -1

  const resolvedDefinition = pieceDefinitions.find(piece => piece.name === name)

  const validMoves = resolvedDefinition?.movementRange.map(movementRange => {
    const [x, y] = position
    const [top, right, bottom, left] = movementRange
    const yDistance = (top - bottom) * yModifier
    const xDistance = right - left

    return [x + xDistance, y + yDistance]
  })

  return validMoves as BoardPosition[]
}

export function ensureNewPositionIsValid(
  name: PieceName,
  player: PlayerColor,
  currentPosition: BoardPosition,
  newPosition: BoardPosition
) {
  const validPieceMoves = resolveValidPieceMoves(name, player, currentPosition)
  const doesValidMovesIncludeNewPosition = validPieceMoves.some(
    move => move[0] === newPosition[0] && move[1] === newPosition[1]
  )
  return doesValidMovesIncludeNewPosition
}
