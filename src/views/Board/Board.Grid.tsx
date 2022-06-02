import { BoardPosition, BoardPositionString, Component } from '@/types'
import { useEffect, useState } from 'react'
import { BoardCell } from 'src/compositions/BoardCell'
// import { resolvePieceMovementRange } from 'src/lib/piece'
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
      // const selectedPiecePosition = selectedPiece.position
      // const movementRange = resolvePieceMovementRange(selectedPiece.name)
      // const traversableCellPositionStrings = calculateTraversableCellPositions()
    }
  }, [gameObject?.selectedPiece])

  function handleCellClick(position: BoardPosition) {
    const piece = gameObject.selectedPiece
    if (piece) dispatch({ type: `MOVE`, piece, position })
  }

  return (
    <div
      className={`grid grid-cols-8 shadow-xl/.5 ${className}`}
      data-testid={testId}
    >
      {gameObject.boardRows.map((row, rowIndex) =>
        row.map(cell => {
          const cellTheme = rowIndex % 2 === 1 ? `odd` : `even`
          const isHighlighted = highlightedCells.includes(
            cell.position.join(`,`)
          )

          return (
            <BoardCell
              key={cell.position.join(`,`)}
              cell={cell}
              cellTheme={cellTheme}
              isHighlighted={isHighlighted}
              onClick={() => handleCellClick(cell.position)}
            />
          )
        })
      )}
    </div>
  )
}
