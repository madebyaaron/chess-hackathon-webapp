import { generateBoard, resolveGridPositionClassNameFromBoardPosition } from '.'

describe(`generate board`, () => {
  it(`generates rows in reverse order`, () => {
    const rows = generateBoard()
    expect(rows[0].every(cell => cell.position[0] === 1)).toBe(true)
    expect(rows[1].every(cell => cell.position[0] === 2)).toBe(true)
    expect(rows[2].every(cell => cell.position[0] === 3)).toBe(true)
    expect(rows[3].every(cell => cell.position[0] === 4)).toBe(true)
    expect(rows[4].every(cell => cell.position[0] === 5)).toBe(true)
    expect(rows[5].every(cell => cell.position[0] === 6)).toBe(true)
    expect(rows[6].every(cell => cell.position[0] === 7)).toBe(true)
    expect(rows[7].every(cell => cell.position[0] === 8)).toBe(true)
    expect(rows[0].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[1].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[2].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[3].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[4].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[5].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[6].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
    expect(rows[7].every((cell, index) => cell.position[1] === index + 1)).toBe(
      true
    )
  })
})

describe(`resolveGridPositionClassNameFromBoardPosition`, () => {
  const resultA = resolveGridPositionClassNameFromBoardPosition([1, 1])
  expect(resultA).toEqual(`row-start-1 col-start-1`)

  const resultB = resolveGridPositionClassNameFromBoardPosition([2, 3])
  expect(resultB).toEqual(`row-start-2 col-start-3`)

  const resultC = resolveGridPositionClassNameFromBoardPosition([7, 7])
  expect(resultC).toEqual(`row-start-7 col-start-7`)
})
