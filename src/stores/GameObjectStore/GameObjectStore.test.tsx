import { generateGameObject } from 'src/lib/game'
import { gameObjectReducer } from './GameObject.reducer'
import { BoardPosition, Piece } from '@/types'
import { adjustPawnValidMovesIfFirstMove } from './GameObject.reducer'

describe(`gameObjectReducer`, () => {
  describe(`select piece`, () => {
    it(`returns a result containing the provided pieces as selected piece`, () => {
      const game = generateGameObject()
      const selectedPiece = game.pieces[0]

      const result = gameObjectReducer(game, {
        type: `SELECT`,
        piece: selectedPiece,
      })

      expect(result.selectedPiece).toEqual(selectedPiece)
    })

    it(`returns a result with no selected pieces when no piece is provided`, () => {
      const game = generateGameObject()
      game.selectedPiece = game.pieces[0]

      const result = gameObjectReducer(game, {
        type: `SELECT`,
        piece: undefined,
      })
      expect(result.selectedPiece).toEqual(undefined)
    })

    it(`returns a result containing valid moves when selecting a piece`, () => {
      const game = generateGameObject()
      const blackLeftRook = game.pieces[0]
      const result = gameObjectReducer(game, {
        type: `SELECT`,
        piece: blackLeftRook,
      })
      expect(result.validMoves.length).toBeGreaterThanOrEqual(1)
    })

    it(`deselecting a piece should set no valid moves in result`, () => {
      const game = generateGameObject()

      const result = gameObjectReducer(game, {
        type: `SELECT`,
        piece: undefined,
      })
      expect(result.validMoves.length).toEqual(0)
    })

    it(`adjusts white pawn valid moves if it is the first move`, () => {
      const game = generateGameObject()
      const leftWhitePawn = game.pieces[8]

      const selectedPiece = gameObjectReducer(game, {
        type: `SELECT`,
        piece: leftWhitePawn,
      })

      const piece = selectedPiece.selectedPiece as Piece
      const validMoves = selectedPiece.validMoves
      const result = adjustPawnValidMovesIfFirstMove(piece, validMoves)

      expect(result).toEqual([
        [1, 6],
        [1, 5],
      ])
    })

    it(`adjusts black pawn valid moves if it is the first move`, () => {
      const game = generateGameObject()
      const leftBlackPawn = game.pieces[16]
      const selectedPiece = gameObjectReducer(game, {
        type: `SELECT`,
        piece: leftBlackPawn,
      })

      const piece = selectedPiece.selectedPiece as Piece
      const validMoves = selectedPiece.validMoves
      const result = adjustPawnValidMovesIfFirstMove(piece, validMoves)

      expect(result).toEqual([
        [1, 3],
        [1, 4],
      ])
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

    it(`moving a piece should set no valid moves in result`, () => {
      const game = generateGameObject()
      const piece = game.pieces[0]
      const newPosition: BoardPosition = [1, 2]

      const result = gameObjectReducer(game, {
        type: `MOVE`,
        piece,
        position: newPosition,
      })

      expect(result.validMoves.length).toEqual(0)
    })

    it(`moving a piece adds a new move state to its history`, () => {
      const game = generateGameObject()
      const leftWhitePawn = game.pieces[8]
      const newPosition: BoardPosition = [1, 6]

      expect(leftWhitePawn.history).toEqual([[1, 7]])

      const result = gameObjectReducer(game, {
        type: `MOVE`,
        piece: leftWhitePawn,
        position: newPosition,
      })

      const updatedPiece = result.pieces[8]
      expect(updatedPiece.history).toEqual([
        [1, 7],
        [1, 6],
      ])
    })
  })
})
