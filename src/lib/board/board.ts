import {
  BoardRows,
  BoardPosition,
  BoardCell,
  PieceMovementRange,
  GameObject,
  BoardRow,
  BoardColumn,
  PositionAdjustmentAmount,
} from '@/types'

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
    const rowLabel = String.fromCharCode(65 + index)
    return new Array(8).fill(null).map(
      (_, index) =>
        ({
          position: [rowLabel.toUpperCase(), (index + 1).toString()],
        } as BoardCell)
    )
  })
  const reversedRows = augmentedRows.reverse()
  return reversedRows
}

export function calculateTraversableCellPositions(
  currentPosition: BoardPosition,
  movementRange: PieceMovementRange,
  gameObject: GameObject
) {
  const traversableCellPositions = movementRange.map(rangeItem => {
    //
  })
}

export function adjustBoardRow(
  boardRow: BoardRow,
  amount: PositionAdjustmentAmount
): string | false {
  const minCharCode = 65
  const maxCharCode = 72

  const charCode = boardRow.charCodeAt(0)
  const adjustedCharCode = charCode + amount
  if (adjustedCharCode < minCharCode) return false
  if (adjustedCharCode > maxCharCode) return false
  const newCharString = String.fromCharCode(adjustedCharCode)
  return newCharString
}

export function adjustBoardCol(
  boardCol: BoardColumn,
  amount: PositionAdjustmentAmount
): string | false {
  const minNumber = 1
  const maxNumber = 8
  const parsedInt = parseInt(boardCol)
  const adjustedInt = parsedInt + amount

  if (adjustedInt < minNumber) return false
  if (adjustedInt > maxNumber) return false
  const stringifiedInt = adjustedInt.toString()

  return stringifiedInt
}
