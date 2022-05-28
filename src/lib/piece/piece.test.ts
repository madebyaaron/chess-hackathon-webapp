import { generatePieces } from '.'

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
