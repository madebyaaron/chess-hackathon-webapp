import { BoardPosition, Component } from '@/types'
import { useGameObject } from 'src/stores/GameObjectStore/GameObjectStore'

interface Props extends Component {}

export function BoardGrid({ className = '', testId = 'board-pieces' }: Props) {
  const [gameObject, dispatch] = useGameObject()

  function handleCellClick(position: BoardPosition) {
    const piece = gameObject.selectedPiece
    if (piece) dispatch({ type: 'MOVE', piece, position })
  }

  return (
    <div
      className={`grid grid-cols-8 w-[1000px] h-[1000px] shadow-xl/.5 ${className}`}
      data-testid={testId}
    >
      {gameObject.boardRows.map((row, rowIndex) =>
        row.map(cell => {
          return (
            <div
              data-testid="board-cell"
              id={`board-cell-${cell.position.join('')}`}
              onClick={() => handleCellClick(cell.position)}
              className={`bg-white flex items-center justify-center ${
                rowIndex % 2 === 1
                  ? 'odd:bg-slate-700 odd:text-white'
                  : 'even:bg-slate-700 even:text-white'
              }`}
              key={cell.position.join('')}
            >
              <span className="opacity-30">{`${cell.position.join('')}`}</span>
            </div>
          )
        })
      )}
    </div>
  )
}
