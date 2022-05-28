import { BoardPosition, Piece } from '@/types'

export function generatePieces(): Piece[] {
  return [
    { id: 'white-pawn-1', name: 'pawn', position: ['B', '1'], player: 'white' },
  ]
}
