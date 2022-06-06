import { BoardPosition } from '@/types'
import {
  generatePieces,
  resolvePieceDefinition,
  resolveValidPieceMoves,
} from '.'

describe(`generate pieces`, () => {
  it(`creates a complete set of pieces for each player`, () => {
    generatePieces()
  })
  it(`all pieces are in initially in their correct positions`, () => {
    const pieces = generatePieces()

    expect(pieces.length).toEqual(32)

    expect(pieces.filter(p => p.player === `black`).length).toEqual(16)
    expect(pieces.filter(p => p.player === `white`).length).toEqual(16)

    expect(pieces.filter(p => p.name === `pawn`).length).toEqual(16)
    expect(pieces.filter(p => p.name === `rook`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `bishop`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `knight`).length).toEqual(4)
    expect(pieces.filter(p => p.name === `queen`).length).toEqual(2)
    expect(pieces.filter(p => p.name === `king`).length).toEqual(2)
  })

  it(`pieces contain the initial starting position in their history`, () => {
    const pieces = generatePieces()
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

describe(`resolvePieceDefinition`, () => {
  it(`returns the definition matching the provided name`, () => {
    expect(resolvePieceDefinition(`pawn`)).toEqual({
      movementRange: [[1, 0, 0, 0]],
      name: `pawn`,
    })

    expect(resolvePieceDefinition(`rook`)).toEqual({
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
    })

    expect(resolvePieceDefinition(`bishop`)).toEqual({
      name: `bishop`,
      movementRange: [
        [1, 1, 0, 0],
        [2, 2, 0, 0],
        [3, 3, 0, 0],
        [4, 4, 0, 0],
        [5, 5, 0, 0],
        [6, 6, 0, 0],
        [7, 7, 0, 0],
        [0, 1, 1, 0],
        [0, 2, 2, 0],
        [0, 3, 3, 0],
        [0, 4, 4, 0],
        [0, 5, 5, 0],
        [0, 6, 6, 0],
        [0, 7, 7, 0],
        [0, 0, 1, 1],
        [0, 0, 2, 2],
        [0, 0, 3, 3],
        [0, 0, 4, 4],
        [0, 0, 5, 5],
        [0, 0, 6, 6],
        [0, 0, 7, 7],
        [1, 0, 0, 1],
        [2, 0, 0, 2],
        [3, 0, 0, 3],
        [4, 0, 0, 4],
        [5, 0, 0, 5],
        [6, 0, 0, 6],
        [7, 0, 0, 7],
      ],
    })

    expect(resolvePieceDefinition(`king`)).toEqual({
      name: `king`,
      movementRange: [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [1, 0, 0, 1],
      ],
    })

    expect(resolvePieceDefinition(`knight`)).toEqual({
      name: `knight`,
      movementRange: [
        [2, 1, 0, 0],
        [2, 0, 0, 1],
        [1, 2, 0, 0],
        [1, 0, 0, 2],
        [0, 1, 2, 0],
        [0, 0, 2, 1],
        [0, 2, 1, 0],
        [0, 0, 1, 2],
      ],
    })

    expect(resolvePieceDefinition(`queen`)).toEqual({
      name: `queen`,
      movementRange: [
        [1, 1, 0, 0],
        [2, 2, 0, 0],
        [3, 3, 0, 0],
        [4, 4, 0, 0],
        [5, 5, 0, 0],
        [6, 6, 0, 0],
        [7, 7, 0, 0],
        [0, 1, 1, 0],
        [0, 2, 2, 0],
        [0, 3, 3, 0],
        [0, 4, 4, 0],
        [0, 5, 5, 0],
        [0, 6, 6, 0],
        [0, 7, 7, 0],
        [0, 0, 1, 1],
        [0, 0, 2, 2],
        [0, 0, 3, 3],
        [0, 0, 4, 4],
        [0, 0, 5, 5],
        [0, 0, 6, 6],
        [0, 0, 7, 7],
        [1, 0, 0, 1],
        [2, 0, 0, 2],
        [3, 0, 0, 3],
        [4, 0, 0, 4],
        [5, 0, 0, 5],
        [6, 0, 0, 6],
        [7, 0, 0, 7],
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
    })
  })

  it(`returns the alternative pawn definition for when it is the pawn's first move`, () => {
    expect(resolvePieceDefinition(`pawn-first-move`)).toEqual({
      movementRange: [
        [1, 0, 0, 0],
        [2, 0, 0, 0],
      ],
      name: `pawn-first-move`,
    })
  })
})

describe(`resolveValidPieceMoves`, () => {
  it(`returns all valid moves for the piece and player color provided`, () => {
    const emptyHistoryToVitoPawnFirstMoveOptions: BoardPosition[] = []
    expect(
      resolveValidPieceMoves(
        `pawn`,
        `black`,
        [1, 2],
        emptyHistoryToVitoPawnFirstMoveOptions
      )
    ).toEqual([[1, 3]])

    expect(
      resolveValidPieceMoves(
        `pawn`,
        `white`,
        [1, 7],
        emptyHistoryToVitoPawnFirstMoveOptions
      )
    ).toEqual([[1, 6]])
    expect(resolveValidPieceMoves(`king`, `white`, [4, 8], [[4, 8]])).toEqual([
      [4, 7],
      [5, 7],
      [5, 8],
      [5, 9],
      [4, 9],
      [3, 9],
      [3, 8],
      [3, 7],
    ])
    expect(resolveValidPieceMoves(`knight`, `black`, [2, 1], [[2, 1]])).toEqual(
      [
        [3, 3],
        [1, 3],
        [4, 2],
        [0, 2],
        [3, -1],
        [1, -1],
        [4, 0],
        [0, 0],
      ]
    )
  })

  it(`returns valid moves for black pawns if they have not had a move yet`, () => {
    expect(resolveValidPieceMoves(`pawn`, `black`, [1, 2], [[1, 2]])).toEqual([
      [1, 3],
      [1, 4],
    ])
  })
  it(`returns valid moves for white pawns if they have not had a move yet`, () => {
    expect(resolveValidPieceMoves(`pawn`, `white`, [1, 7], [[1, 7]])).toEqual([
      [1, 6],
      [1, 5],
    ])
  })
})
