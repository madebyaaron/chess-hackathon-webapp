import { generateGameObject } from 'src/lib/game'
import { gameObjectReducer } from './GameObject.reducer'
import { BoardPosition, Piece } from '@/types'

describe(`gameObjectReducer`, () => {
  describe(`select piece`, () => {
    it(`allows the current player to select a piece belonging to them`, () => {
      const game = generateGameObject()
      const selectedPiece = game.pieces.find(p => p.player === game.playerTurn)
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: selectedPiece,
      })

      expect(result.selectedPiece).toEqual(selectedPiece)
    })

    it(`does not allow a player to select a piece that does not belong to them`, () => {
      const game = generateGameObject()
      const selectedPiece = game.pieces.find(p => p.player !== game.playerTurn)
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: selectedPiece,
      })

      expect(result.selectedPiece).toEqual(game.selectedPiece)
    })

    it(`returns a result with no selected pieces when no piece is provided`, () => {
      const game = generateGameObject()
      game.selectedPiece = game.pieces[0]

      const result = gameObjectReducer(game, {
        type: `select`,
        piece: undefined,
      })
      expect(result.selectedPiece).toEqual(undefined)
    })

    it(`returns a result containing valid moves when selecting a piece`, () => {
      const game = generateGameObject()
      const blackLeftRook = game.pieces[0]
      const result = gameObjectReducer(game, {
        type: `select`,
        piece: blackLeftRook,
      })
      expect(result.validMoves.length).toBeGreaterThanOrEqual(1)
    })

    it(`deselecting a piece should set no valid moves in result`, () => {
      const game = generateGameObject()

      const result = gameObjectReducer(game, {
        type: `select`,
        piece: undefined,
      })
      expect(result.validMoves.length).toEqual(0)
    })
  })

  describe(`move piece`, () => {
    it(`moves the provided piece to the provided position`, () => {
      const game = generateGameObject()
      const piece = game.pieces.find(p => p.id === `white-pawn-1`) as Piece
      const oldPosition = piece.position

      const position: BoardPosition = [1, 8]
      const result = gameObjectReducer(game, {
        type: `move`,
        piece,
        position,
      })

      const updatedPiece = result.pieces[0]
      expect(updatedPiece.position).not.toEqual(oldPosition)
      expect(updatedPiece.position).toEqual(position)
    })

    it(`moving a piece should set valid moves to an empty array`, () => {
      const game = generateGameObject()
      const piece = game.pieces[0]
      const newPosition: BoardPosition = [1, 2]

      const result = gameObjectReducer(game, {
        type: `move`,
        piece,
        position: newPosition,
      })

      expect(result.validMoves.length).toEqual(0)
    })

    it(`moving a piece ends the current turn`, () => {
      const game = generateGameObject()
      const currentPlayer = game.playerTurn
      const leftWhitePawn = game.pieces[8]
      const newPosition: BoardPosition = [1, 6]
      const result = gameObjectReducer(game, {
        type: `move`,
        piece: leftWhitePawn,
        position: newPosition,
      })
      expect(result.playerTurn).not.toEqual(currentPlayer)
    })

    it(`successfully moving a piece sets the selectedPiece prop of the game object to undefined`, () => {
      const game = generateGameObject()
      const leftWhitePawn = game.pieces[8]
      const newPosition: BoardPosition = [1, 6]
      const result = gameObjectReducer(game, {
        type: `move`,
        piece: leftWhitePawn,
        position: newPosition,
      })
      expect(result.selectedPiece).toEqual(undefined)
    })
  })

  describe(`attack piece`, () => {
    it(`attacking a piece should set the target piece status to "taken"`, () => {
      //
    })

    it(`attacking a piece should set valid attacks to an empty array`, () => {
      // const game = generateGameObject()
      // const piece = game.pieces[0]
      // const newPosition: BoardPosition = [1, 2]
      // const result = gameObjectReducer(game, {
      //   type: `move`,
      //   piece,
      //   position: newPosition,
      // })
      // expect(result.validMoves.length).toEqual(0)
    })
  })
})
