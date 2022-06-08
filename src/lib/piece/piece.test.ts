import { Piece } from '@/types'
import { generateInitialPieceState } from 'src/constants/piecesInitialState'
import { ensureNewPositionIsValid, resolveValidPieceMoves } from '.'

describe(`generate pieces`, () => {
  it(`all needed pieces are generated`, () => {
    const pieces = generateInitialPieceState()

    expect(pieces.filter(p => p.player === `black`).length).toEqual(16)
    expect(pieces.filter(p => p.player === `white`).length).toEqual(16)

    expect(pieces.filter(p => p.name === `pawn`).length).toEqual(16)
    expect(pieces.filter(p => p.name === `rook`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `bishop`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `knight`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `queen`).length).toEqual(2)
    expect(pieces.filter(p => p.name === `king`).length).toEqual(2)
  })

  it(`all initial piece positions are correct`, () => {
    const pieces = generateInitialPieceState()

    const pawn = pieces.filter(p => p.name === `pawn`)
    expect(pawn[0].history).toEqual([[1, 7]])

    const rook = pieces.filter(p => p.name === `rook`)
    expect(rook[0].history).toEqual([[1, 8]])

    const bishop = pieces.filter(p => p.name === `bishop`)
    expect(bishop[0].history).toEqual([[3, 8]])

    const knight = pieces.filter(p => p.name === `knight`)
    expect(knight[0].history).toEqual([[2, 8]])

    const queen = pieces.filter(p => p.name === `queen`)
    expect(queen[0].history).toEqual([[5, 8]])

    const king = pieces.filter(p => p.name === `king`)
    expect(king[0].history).toEqual([[4, 8]])
  })

  it(`pieces contain initial starting position in their history`, () => {
    const pieces = generateInitialPieceState()
    expect(pieces.length).toEqual(32)

    const pawn = pieces.filter(p => p.name === `pawn`)
    expect(pawn[0].history).toEqual([[1, 7]])

    const rook = pieces.filter(p => p.name === `rook`)
    expect(rook[0].history).toEqual([[1, 8]])

    const bishop = pieces.filter(p => p.name === `bishop`)
    expect(bishop[0].history).toEqual([[3, 8]])

    const knight = pieces.filter(p => p.name === `knight`)
    expect(knight[0].history).toEqual([[2, 8]])

    const queen = pieces.filter(p => p.name === `queen`)
    expect(queen[0].history).toEqual([[5, 8]])

    const king = pieces.filter(p => p.name === `king`)
    expect(king[0].history).toEqual([[4, 8]])
  })
})

describe(`resolveValidPieceMoves`, () => {
  it(`returns all valid piece moves using default movement range when not first move`, () => {
    const king = generateInitialPieceState().find(
      p => p.id === `white-king-1`
    ) as Piece
    king.position = [4, 7]
    king.history = [
      [4, 8],
      [4, 7],
    ]
    const kingValidMoves = resolveValidPieceMoves(king)
    expect(kingValidMoves).toEqual([
      [4, 6],
      [5, 6],
      [5, 7],
      [5, 8],
      [4, 8],
      [3, 8],
      [3, 7],
      [3, 6],
    ])

    const pawn = generateInitialPieceState().find(
      p => p.id === `black-pawn-1`
    ) as Piece
    pawn.position = [1, 3]
    pawn.history = [
      [1, 2],
      [1, 3],
    ]
    const pawnValidMoves = resolveValidPieceMoves(pawn)
    expect(pawnValidMoves).toEqual([[1, 4]])
  })

  it(`returns all valid piece moves using initial movement range on first move`, () => {
    const piece = generateInitialPieceState().find(
      p => p.id === `black-pawn-1`
    ) as Piece
    const validMoves = resolveValidPieceMoves(piece)
    expect(validMoves).toEqual([
      [1, 3],
      [1, 4],
    ])
  })
})

describe(`ensureNewPositionIsValid`, () => {
  it(`returns true where the move provided is a valid move of the piece provided`, () => {
    const piece = generateInitialPieceState().find(
      p => p.id === `black-pawn-1`
    ) as Piece
    expect(ensureNewPositionIsValid(piece, [1, 3])).toEqual(true)
    expect(ensureNewPositionIsValid(piece, [1, 4])).toEqual(true)
  })

  it(`returns false where the move provided is not a valid move of the piece provided`, () => {
    const piece = generateInitialPieceState().find(
      p => p.id === `black-pawn-1`
    ) as Piece
    expect(ensureNewPositionIsValid(piece, [1, 5])).toEqual(false)
  })
})
