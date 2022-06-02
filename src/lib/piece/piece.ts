import { Piece, PieceName } from '@/types'

export function generatePieces(): Piece[] {
  return [
    {
      id: `white-rook-1`,
      name: `rook`,
      position: [8, 1],
      player: `white`,
    },
    {
      id: `white-knight-1`,
      name: `knight`,
      position: [8, 2],
      player: `white`,
    },
    {
      id: `white-bishop-1`,
      name: `bishop`,
      position: [8, 3],
      player: `white`,
    },
    {
      id: `white-king-1`,
      name: `king`,
      position: [8, 4],
      player: `white`,
    },
    {
      id: `white-queen-1`,
      name: `queen`,
      position: [8, 5],
      player: `white`,
    },
    {
      id: `white-bishop-2`,
      name: `bishop`,
      position: [8, 6],
      player: `white`,
    },
    {
      id: `white-knight-2`,
      name: `knight`,
      position: [8, 7],
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
      position: [7, 1],
      player: `white`,
    },
    {
      id: `white-pawn-2`,
      name: `pawn`,
      position: [7, 2],
      player: `white`,
    },
    {
      id: `white-pawn-3`,
      name: `pawn`,
      position: [7, 3],
      player: `white`,
    },
    {
      id: `white-pawn-4`,
      name: `pawn`,
      position: [7, 4],
      player: `white`,
    },
    {
      id: `white-pawn-5`,
      name: `pawn`,
      position: [7, 5],
      player: `white`,
    },
    {
      id: `white-pawn-6`,
      name: `pawn`,
      position: [7, 6],
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
      position: [7, 8],
      player: `white`,
    },
    {
      id: `black-pawn-1`,
      name: `pawn`,
      position: [2, 1],
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
      position: [2, 3],
      player: `black`,
    },
    {
      id: `black-pawn-4`,
      name: `pawn`,
      position: [2, 4],
      player: `black`,
    },
    {
      id: `black-pawn-5`,
      name: `pawn`,
      position: [2, 5],
      player: `black`,
    },
    {
      id: `black-pawn-6`,
      name: `pawn`,
      position: [2, 6],
      player: `black`,
    },
    {
      id: `black-pawn-7`,
      name: `pawn`,
      position: [2, 7],
      player: `black`,
    },
    {
      id: `black-pawn-8`,
      name: `pawn`,
      position: [2, 8],
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
      position: [1, 2],
      player: `black`,
    },
    {
      id: `black-bishop-1`,
      name: `bishop`,
      position: [1, 3],
      player: `black`,
    },
    {
      id: `black-king-1`,
      name: `king`,
      position: [1, 4],
      player: `black`,
    },
    {
      id: `black-queen-1`,
      name: `queen`,
      position: [1, 5],
      player: `black`,
    },
    {
      id: `black-bishop-2`,
      name: `bishop`,
      position: [1, 6],
      player: `black`,
    },
    {
      id: `black-knight-2`,
      name: `knight`,
      position: [1, 7],
      player: `black`,
    },
    {
      id: `black-rook-2`,
      name: `rook`,
      position: [1, 8],
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
]

export function resolvePieceDefinition(name: PieceName) {
  return pieceDefinitions.find(p => p.name === name)
}

export function resolvePieceMovementRange(name: PieceName) {
  const pieceDefinition = resolvePieceDefinition(name)
  return pieceDefinition?.movementRange
}
