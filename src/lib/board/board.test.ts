import { generateBoard, resolveGridPositionClassNameFromBoardPosition } from '.'

describe(`generate board`, () => {
  it(`generates rows in reverse order`, () => {
    const rows = generateBoard()
    expect(rows[0].every(cell => cell.position[0] === `H`)).toBe(true)
    expect(rows[1].every(cell => cell.position[0] === `G`)).toBe(true)
    expect(rows[2].every(cell => cell.position[0] === `F`)).toBe(true)
    expect(rows[3].every(cell => cell.position[0] === `E`)).toBe(true)
    expect(rows[4].every(cell => cell.position[0] === `D`)).toBe(true)
    expect(rows[5].every(cell => cell.position[0] === `C`)).toBe(true)
    expect(rows[6].every(cell => cell.position[0] === `B`)).toBe(true)
    expect(rows[7].every(cell => cell.position[0] === `A`)).toBe(true)

    expect(
      rows[0].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[1].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[2].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[3].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[4].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[5].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[6].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
    expect(
      rows[7].every((cell, index) => cell.position[1] === `${index + 1}`)
    ).toBe(true)
  })
})

describe(`resolveGridPositionClassNameFromBoardPosition`, () => {
  const resultA = resolveGridPositionClassNameFromBoardPosition([`A`, `2`])
  expect(resultA).toEqual(`row-start-8 col-start-2`)

  const resultB = resolveGridPositionClassNameFromBoardPosition([`F`, `4`])
  expect(resultB).toEqual(`row-start-3 col-start-4`)

  const resultC = resolveGridPositionClassNameFromBoardPosition([`H`, `7`])
  expect(resultC).toEqual(`row-start-1 col-start-7`)
})
