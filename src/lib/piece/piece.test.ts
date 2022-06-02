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
})

describe(`resolvePieceDefinition`, () => {
  it(`returns the definition matching the provided name`, () => {
    expect(resolvePieceDefinition(`pawn`)).toEqual({
      name: `pawn`,
      movementRange: [[1, 0, 0, 0]],
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
})

describe(`resolveValidPieceMoves`, () => {
  it(`returns all valid moves for the piece and player color provided`, () => {
    expect(resolveValidPieceMoves(`pawn`, `black`, [1, 2])).toEqual([[1, 3]])

    expect(resolveValidPieceMoves(`pawn`, `white`, [1, 7])).toEqual([[1, 6]])
  })
})
