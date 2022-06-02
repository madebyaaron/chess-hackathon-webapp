import { ReactNode } from 'react'

export interface Component {
  children?: ReactNode | string
  className?: string
  testId?: string
}

// Boards
export interface BoardCell {
  position: BoardPosition
}
export type BoardRows = BoardCell[][]
export type BoardPosition = [BoardPositionNode, BoardPositionNode]
export type BoardPositionNode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type BoardPositionString = string
export type PositionAdjustmentAmount =
  | -1
  | -2
  | -3
  | -4
  | -5
  | -6
  | -7
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7

// Pieces
export type PieceName = `pawn` | `knight` | `bishop` | `rook` | `queen` | `king`

export type PieceMovementRange = [number, number, number, number][]
export interface Piece {
  id: string
  name: PieceName
  position: BoardPosition
  player: `black` | `white`
}

// Game Object
export interface GameObject {
  status: `loading` | `ready`
  boardRows: BoardRows
  pieces: Piece[]
  selectedPiece?: Piece
}
