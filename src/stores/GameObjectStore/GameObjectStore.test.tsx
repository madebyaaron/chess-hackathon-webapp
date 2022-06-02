import { generateGameObject } from 'src/lib/game'
import { gameObjectReducer } from './GameObject.reducer'
import { BoardPosition } from '@/types'

describe(`gameObjectReducer`, () => {
  describe(`select piece`, () => {
    it(`select action selects a piece when provided`, () => {
      const game = generateGameObject()
      const selectedPiece = game.pieces[0]

      const result = gameObjectReducer(game, {
        type: `SELECT`,
        piece: selectedPiece,
      })

      expect(result.selectedPiece).toEqual(selectedPiece)
    })

    it(`select action deselects a piece when undefined is provided`, () => {
      const game = generateGameObject()
      game.selectedPiece = game.pieces[0]

      const result = gameObjectReducer(game, {
        type: `SELECT`,
        piece: undefined,
      })
      expect(result.selectedPiece).toEqual(undefined)
    })
  })

  describe(`move piece`, () => {
    it(`moves the provided piece to the provided position`, () => {
      const game = generateGameObject()
      const piece = game.pieces[0]
      const oldPosition = piece.position

      const position: BoardPosition = [1, 2]
      const result = gameObjectReducer(game, {
        type: `MOVE`,
        piece,
        position,
      })

      const updatedPiece = result.pieces[0]
      expect(updatedPiece.position).not.toEqual(oldPosition)
      expect(updatedPiece.position).toEqual(position)
    })
  })
})
