import { Piece, PieceName } from '@/types'

export function generatePieces(): Piece[] {
  return [
    {
      id: `white-rook-1`,
      name: `rook`,
      position: [`A`, `1`],
      player: `white`,
    },
    {
      id: `white-knight-1`,
      name: `knight`,
      position: [`A`, `2`],
      player: `white`,
    },
    {
      id: `white-bishop-1`,
      name: `bishop`,
      position: [`A`, `3`],
      player: `white`,
    },
    {
      id: `white-king-1`,
      name: `king`,
      position: [`A`, `4`],
      player: `white`,
    },
    {
      id: `white-queen-1`,
      name: `queen`,
      position: [`A`, `5`],
      player: `white`,
    },
    {
      id: `white-bishop-2`,
      name: `bishop`,
      position: [`A`, `6`],
      player: `white`,
    },
    {
      id: `white-knight-2`,
      name: `knight`,
      position: [`A`, `7`],
      player: `white`,
    },
    {
      id: `white-rook-2`,
      name: `rook`,
      position: [`A`, `8`],
      player: `white`,
    },
    {
      id: `white-pawn-1`,
      name: `pawn`,
      position: [`B`, `1`],
      player: `white`,
    },
    {
      id: `white-pawn-2`,
      name: `pawn`,
      position: [`B`, `2`],
      player: `white`,
    },
    {
      id: `white-pawn-3`,
      name: `pawn`,
      position: [`B`, `3`],
      player: `white`,
    },
    {
      id: `white-pawn-4`,
      name: `pawn`,
      position: [`B`, `4`],
      player: `white`,
    },
    {
      id: `white-pawn-5`,
      name: `pawn`,
      position: [`B`, `5`],
      player: `white`,
    },
    {
      id: `white-pawn-6`,
      name: `pawn`,
      position: [`B`, `6`],
      player: `white`,
    },
    {
      id: `white-pawn-7`,
      name: `pawn`,
      position: [`B`, `7`],
      player: `white`,
    },
    {
      id: `white-pawn-8`,
      name: `pawn`,
      position: [`B`, `8`],
      player: `white`,
    },

    {
      id: `black-pawn-1`,
      name: `pawn`,
      position: [`G`, `1`],
      player: `black`,
    },
    {
      id: `black-pawn-2`,
      name: `pawn`,
      position: [`G`, `2`],
      player: `black`,
    },
    {
      id: `black-pawn-3`,
      name: `pawn`,
      position: [`G`, `3`],
      player: `black`,
    },
    {
      id: `black-pawn-4`,
      name: `pawn`,
      position: [`G`, `4`],
      player: `black`,
    },
    {
      id: `black-pawn-5`,
      name: `pawn`,
      position: [`G`, `5`],
      player: `black`,
    },
    {
      id: `black-pawn-6`,
      name: `pawn`,
      position: [`G`, `6`],
      player: `black`,
    },
    {
      id: `black-pawn-7`,
      name: `pawn`,
      position: [`G`, `7`],
      player: `black`,
    },
    {
      id: `black-pawn-8`,
      name: `pawn`,
      position: [`G`, `8`],
      player: `black`,
    },
    {
      id: `black-rook-1`,
      name: `rook`,
      position: [`H`, `1`],
      player: `black`,
    },
    {
      id: `black-knight-1`,
      name: `knight`,
      position: [`H`, `2`],
      player: `black`,
    },
    {
      id: `black-bishop-1`,
      name: `bishop`,
      position: [`H`, `3`],
      player: `black`,
    },
    {
      id: `black-king-1`,
      name: `king`,
      position: [`H`, `4`],
      player: `black`,
    },
    {
      id: `black-queen-1`,
      name: `queen`,
      position: [`H`, `5`],
      player: `black`,
    },
    {
      id: `black-bishop-2`,
      name: `bishop`,
      position: [`H`, `6`],
      player: `black`,
    },
    {
      id: `black-knight-2`,
      name: `knight`,
      position: [`H`, `7`],
      player: `black`,
    },
    {
      id: `black-rook-2`,
      name: `rook`,
      position: [`H`, `8`],
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
