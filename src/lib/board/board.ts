import { BoardRows, BoardPosition, BoardCell } from '@/types'

const gridColumnClassNames = {
  '1': `col-start-1`,
  '2': `col-start-2`,
  '3': `col-start-3`,
  '4': `col-start-4`,
  '5': `col-start-5`,
  '6': `col-start-6`,
  '7': `col-start-7`,
  '8': `col-start-8`,
}

const gridRowClassNames = {
  H: `row-start-1`,
  G: `row-start-2`,
  F: `row-start-3`,
  E: `row-start-4`,
  D: `row-start-5`,
  C: `row-start-6`,
  B: `row-start-7`,
  A: `row-start-8`,
}

export function resolveGridPositionClassNameFromBoardPosition(
  boardPosition: BoardPosition
) {
  const rowClassName = gridRowClassNames[boardPosition[0]]
  const columnClassName = gridColumnClassNames[boardPosition[1]]

  return `${rowClassName} ${columnClassName}`
}

export function generateBoard(): BoardRows {
  const rows = new Array(8).fill(null).map(() => new Array(8).fill({}))

  const augmentedRows = rows.map((_, index) => {
    const rowLabel = String.fromCharCode(97 + index)
    return new Array(8).fill(null).map(
      (_, index) =>
        ({
          position: [rowLabel.toUpperCase(), (index + 1).toString()],
        } as BoardCell)
    )
  })

  return augmentedRows.reverse()
}
