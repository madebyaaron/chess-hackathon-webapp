import {
  adjustBoardCol,
  adjustBoardRow,
  generateBoard,
  resolveGridPositionClassNameFromBoardPosition,
} from '.'

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

describe(`adjustBoardRow`, () => {
  it(`adjustBoardRow returns accurately`, () => {
    const resultA = adjustBoardRow(`A`, 2)
    expect(resultA).toEqual(`C`)

    const resultB = adjustBoardRow(`F`, 1)
    expect(resultB).toEqual(`G`)

    const resultC = adjustBoardRow(`G`, -2)
    expect(resultC).toEqual(`E`)
  })

  it(`returns false if result is out of range`, () => {
    const resultA = adjustBoardRow(`A`, -2)
    expect(resultA).toEqual(false)

    const resultB = adjustBoardRow(`F`, 4)
    expect(resultB).toEqual(false)

    const resultC = adjustBoardRow(`G`, 7)
    expect(resultC).toEqual(false)
  })
})

describe(`adjustBoardCol`, () => {
  it(`adjustBoardCol returns accurately`, () => {
    const resultA = adjustBoardCol(`1`, 2)
    expect(resultA).toEqual(`3`)

    const resultB = adjustBoardCol(`6`, 1)
    expect(resultB).toEqual(`7`)

    const resultC = adjustBoardCol(`7`, -2)
    expect(resultC).toEqual(`5`)
  })

  it(`returns false if result is out of range`, () => {
    const resultA = adjustBoardCol(`1`, -2)
    expect(resultA).toEqual(false)

    const resultB = adjustBoardCol(`7`, 4)
    expect(resultB).toEqual(false)

    const resultC = adjustBoardCol(`6`, 7)
    expect(resultC).toEqual(false)
  })
})
