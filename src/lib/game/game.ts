import { generateBoard } from 'src/lib/board'
import { generatePieces } from 'src/lib/piece'
import { GameObject, GameObjectLike } from '@/types'

export function generateGameObject(config: GameObjectLike = {}): GameObject {
  return {
    status: `ready`,
    boardRows: generateBoard(),
    pieces: generatePieces(),
    validMoves: [],
    ...config,
  }
}
