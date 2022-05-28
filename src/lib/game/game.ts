import { generateBoard } from 'src/lib/board'
import { generatePieces } from 'src/lib/piece'
import { GameObject } from '@/types'

export function generateGameObject(): GameObject {
  return {
    status: `ready`,
    boardRows: generateBoard(),
    pieces: generatePieces(),
  }
}
