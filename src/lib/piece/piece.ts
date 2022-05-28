import { BoardPosition, Piece } from '@/types'

export function generatePieces(): Piece[] {
  return [
    { id: 'white-pawn-1', name: 'pawn', position: ['D', '2'], player: 'white' },
  ]
}
