import { Component, GameObject } from '@/types'

interface Props extends Component {
  gameObject: GameObject
}

export function BoardPieces({
  gameObject,
  className = '',
  testId = 'board-pieces',
}: Props) {
  return (
    <div
      className={`grid grid-cols-8 w-[1000px] h-[1000px] shadow-xl/.5 pointer-events-none ${className}`}
      data-testid={testId}
    >
      {gameObject.boardRows.map((row, rowIndex) =>
        row.map(cell => {
          return (
            <div
              data-testid="board-cell"
              id={`board-cell-${cell.position.join('')}`}
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
