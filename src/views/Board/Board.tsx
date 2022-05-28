import { Component } from '@/types'
import { useEffect, useState } from 'react'

interface Props extends Component {}

interface Cell {
  index?: number
}

type CellRow = Cell[]
type AllRows = CellRow[]

export function Board({ testId = `board` }: Props) {
  const rowCells: Cell[] = new Array(8).fill({})

  const [rows, setRows] = useState<AllRows>(new Array(8).fill(rowCells))

  // cell: CellState
  // row of cells: CellState[]
  // array of rows: CellState[][]

  useEffect(() => {
    // init code here
    setRows(rows)
  }, [])

  return (
    <div
      data-testid={testId}
      className="h-full min-h-screen w-full flex items-center justify-center bg-slate-200"
    >
      <div className="grid grid-cols-8 w-[1000px] h-[1000px] shadow-xl/.5">
        {rows.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            return (
              <div
                className={`bg-white flex items-center justify-center ${
                  rowIndex % 2 === 1
                    ? 'odd:bg-slate-700 odd:text-white'
                    : 'even:bg-slate-700 even:text-white'
                }`}
                key={rowIndex + cellIndex}
              ></div>
            )
          })
        )}
      </div>
    </div>
  )
}
