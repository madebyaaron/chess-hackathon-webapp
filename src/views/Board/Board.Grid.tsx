import { BoardPosition, BoardPositionString, Component } from '@/types'
import { useEffect, useState } from 'react'
import { resolvePieceMovementRange } from 'src/lib/piece'
import { useGameObject } from 'src/stores/GameObjectStore/GameObjectStore'

interface Props extends Component {}

export function BoardGrid({
  className = ``,
  testId = `board-underlay`,
}: Props) {
  const [gameObject, dispatch] = useGameObject()

  const [highlightedCells, setHighlightedCells] = useState<
    BoardPositionString[]
  >([])

  useEffect(() => {
    const { selectedPiece } = gameObject
    if (selectedPiece) {
      const selectedPiecePosition = selectedPiece.position
      const movementRange = resolvePieceMovementRange(selectedPiece.name)

      const traversableCellPositionStrings = calculateTraversableCellPositions()
    }
  }, [gameObject?.selectedPiece])

  function handleCellClick(position: BoardPosition) {
    const piece = gameObject.selectedPiece
    if (piece) dispatch({ type: `MOVE`, piece, position })
  }

  const variants = {
    standardColours: {
      white: `even:bg-slate-700 even:text-white`,
      black: `odd:bg-slate-700 odd:text-white`,
    },
    highlightedColours: {
      white: `even:bg-slate-500 even:text-white`,
      black: `odd:bg-slate-500 odd:text-white`,
    },
  }

  return (
    <div
      className={`grid grid-cols-8 shadow-xl/.5 ${className}`}
      data-testid={testId}
    >
      {gameObject.boardRows.map((row, rowIndex) =>
        row.map(cell => {
          const cellColor = rowIndex % 2 === 1 ? `black` : `white`
          const isHighlighted = highlightedCells.includes(
            cell.position.join(``)
          )

          return (
            <div
              data-testid="board-cell"
              id={`board-cell-${cell.position.join(``)}`}
              onClick={() => handleCellClick(cell.position)}
              className={`bg-white flex items-center justify-center ${
                isHighlighted
                  ? variants.highlightedColours[cellColor]
                  : variants.standardColours[cellColor]
              }`}
              key={cell.position.join(``)}
            >
              <span className="opacity-30">{`${cell.position.join(``)}`}</span>
            </div>
          )
        })
      )}
    </div>
  )
}
