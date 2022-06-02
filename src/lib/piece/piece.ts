import { BoardPosition, Piece, PieceName, PlayerColor } from '@/types'

export function generatePieces(): Piece[] {
  return [
    {
      id: `white-rook-1`,
      name: `rook`,
      position: [1, 8],
      player: `white`,
    },
    {
      id: `white-knight-1`,
      name: `knight`,
      position: [2, 8],
      player: `white`,
    },
    {
      id: `white-bishop-1`,
      name: `bishop`,
      position: [3, 8],
      player: `white`,
    },
    {
      id: `white-king-1`,
      name: `king`,
      position: [4, 8],
      player: `white`,
    },
    {
      id: `white-queen-1`,
      name: `queen`,
      position: [5, 8],
      player: `white`,
    },
    {
      id: `white-bishop-2`,
      name: `bishop`,
      position: [6, 8],
      player: `white`,
    },
    {
      id: `white-knight-2`,
      name: `knight`,
      position: [7, 8],
      player: `white`,
    },
    {
      id: `white-rook-2`,
      name: `rook`,
      position: [8, 8],
      player: `white`,
    },
    {
      id: `white-pawn-1`,
      name: `pawn`,
      position: [1, 7],
      player: `white`,
    },
    {
      id: `white-pawn-2`,
      name: `pawn`,
      position: [2, 7],
      player: `white`,
    },
    {
      id: `white-pawn-3`,
      name: `pawn`,
      position: [3, 7],
      player: `white`,
    },
    {
      id: `white-pawn-4`,
      name: `pawn`,
      position: [4, 7],
      player: `white`,
    },
    {
      id: `white-pawn-5`,
      name: `pawn`,
      position: [5, 7],
      player: `white`,
    },
    {
      id: `white-pawn-6`,
      name: `pawn`,
      position: [6, 7],
      player: `white`,
    },
    {
      id: `white-pawn-7`,
      name: `pawn`,
      position: [7, 7],
      player: `white`,
    },
    {
      id: `white-pawn-8`,
      name: `pawn`,
      position: [8, 7],
      player: `white`,
    },
    {
      id: `black-pawn-1`,
      name: `pawn`,
      position: [1, 2],
      player: `black`,
    },
    {
      id: `black-pawn-2`,
      name: `pawn`,
      position: [2, 2],
      player: `black`,
    },
    {
      id: `black-pawn-3`,
      name: `pawn`,
      position: [3, 2],
      player: `black`,
    },
    {
      id: `black-pawn-4`,
      name: `pawn`,
      position: [4, 2],
      player: `black`,
    },
    {
      id: `black-pawn-5`,
      name: `pawn`,
      position: [5, 2],
      player: `black`,
    },
    {
      id: `black-pawn-6`,
      name: `pawn`,
      position: [6, 2],
      player: `black`,
    },
    {
      id: `black-pawn-7`,
      name: `pawn`,
      position: [7, 2],
      player: `black`,
    },
    {
      id: `black-pawn-8`,
      name: `pawn`,
      position: [8, 2],
      player: `black`,
    },
    {
      id: `black-rook-1`,
      name: `rook`,
      position: [1, 1],
      player: `black`,
    },
    {
      id: `black-knight-1`,
      name: `knight`,
      position: [2, 1],
      player: `black`,
    },
    {
      id: `black-bishop-1`,
      name: `bishop`,
      position: [3, 1],
      player: `black`,
    },
    {
      id: `black-king-1`,
      name: `king`,
      position: [4, 1],
      player: `black`,
    },
    {
      id: `black-queen-1`,
      name: `queen`,
      position: [5, 1],
      player: `black`,
    },
    {
      id: `black-bishop-2`,
      name: `bishop`,
      position: [6, 1],
      player: `black`,
    },
    {
      id: `black-knight-2`,
      name: `knight`,
      position: [7, 1],
      player: `black`,
    },
    {
      id: `black-rook-2`,
      name: `rook`,
      position: [8, 1],
      player: `black`,
    },
  ]
}

type UpDistance = number
type RightDistance = number
type BottomDistance = number
type LeftDistance = number
interface PieceDefinition {
  name: PieceName
  movementRange: [UpDistance, RightDistance, BottomDistance, LeftDistance][]
}

const pieceDefinitions: PieceDefinition[] = [
  {
    name: `pawn`,
    movementRange: [[1, 0, 0, 0]],
  },
  {
    name: `knight`,
    movementRange: [
      [2, 1, 0, 0],
      [2, 0, 0, 1],
      [1, 2, 0, 0],
      [1, 0, 0, 2],
      [0, 1, 2, 0],
      [0, 0, 2, 1],
      [0, 2, 1, 0],
      [0, 0, 1, 2],
    ],
  },
  {
    name: `king`,
    movementRange: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
    ],
  },
  {
    name: `rook`,
    movementRange: [
      [1, 0, 0, 0],
      [2, 0, 0, 0],
      [3, 0, 0, 0],
      [4, 0, 0, 0],
      [5, 0, 0, 0],
      [6, 0, 0, 0],
      [7, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 2, 0, 0],
      [0, 3, 0, 0],
      [0, 4, 0, 0],
      [0, 5, 0, 0],
      [0, 6, 0, 0],
      [0, 7, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 2, 0],
      [0, 0, 3, 0],
      [0, 0, 4, 0],
      [0, 0, 5, 0],
      [0, 0, 6, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 2],
      [0, 0, 0, 3],
      [0, 0, 0, 4],
      [0, 0, 0, 5],
      [0, 0, 0, 6],
      [0, 0, 0, 7],
    ],
  },
  {
    name: `bishop`,
    movementRange: [
      [1, 1, 0, 0],
      [2, 2, 0, 0],
      [3, 3, 0, 0],
      [4, 4, 0, 0],
      [5, 5, 0, 0],
      [6, 6, 0, 0],
      [7, 7, 0, 0],
      [0, 1, 1, 0],
      [0, 2, 2, 0],
      [0, 3, 3, 0],
      [0, 4, 4, 0],
      [0, 5, 5, 0],
      [0, 6, 6, 0],
      [0, 7, 7, 0],
      [0, 0, 1, 1],
      [0, 0, 2, 2],
      [0, 0, 3, 3],
      [0, 0, 4, 4],
      [0, 0, 5, 5],
      [0, 0, 6, 6],
      [0, 0, 7, 7],
      [1, 0, 0, 1],
      [2, 0, 0, 2],
      [3, 0, 0, 3],
      [4, 0, 0, 4],
      [5, 0, 0, 5],
      [6, 0, 0, 6],
      [7, 0, 0, 7],
    ],
  },
  {
    name: `queen`,
    movementRange: [
      [1, 1, 0, 0],
      [2, 2, 0, 0],
      [3, 3, 0, 0],
      [4, 4, 0, 0],
      [5, 5, 0, 0],
      [6, 6, 0, 0],
      [7, 7, 0, 0],
      [0, 1, 1, 0],
      [0, 2, 2, 0],
      [0, 3, 3, 0],
      [0, 4, 4, 0],
      [0, 5, 5, 0],
      [0, 6, 6, 0],
      [0, 7, 7, 0],
      [0, 0, 1, 1],
      [0, 0, 2, 2],
      [0, 0, 3, 3],
      [0, 0, 4, 4],
      [0, 0, 5, 5],
      [0, 0, 6, 6],
      [0, 0, 7, 7],
      [1, 0, 0, 1],
      [2, 0, 0, 2],
      [3, 0, 0, 3],
      [4, 0, 0, 4],
      [5, 0, 0, 5],
      [6, 0, 0, 6],
      [7, 0, 0, 7],
      [1, 0, 0, 0],
      [2, 0, 0, 0],
      [3, 0, 0, 0],
      [4, 0, 0, 0],
      [5, 0, 0, 0],
      [6, 0, 0, 0],
      [7, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 2, 0, 0],
      [0, 3, 0, 0],
      [0, 4, 0, 0],
      [0, 5, 0, 0],
      [0, 6, 0, 0],
      [0, 7, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 2, 0],
      [0, 0, 3, 0],
      [0, 0, 4, 0],
      [0, 0, 5, 0],
      [0, 0, 6, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 2],
      [0, 0, 0, 3],
      [0, 0, 0, 4],
      [0, 0, 0, 5],
      [0, 0, 0, 6],
      [0, 0, 0, 7],
    ],
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
