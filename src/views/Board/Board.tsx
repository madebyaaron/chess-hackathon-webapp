import { Component, GameObject } from '@/types'
import { useState } from 'react'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'

interface Props extends Component {
  initialGameObject: GameObject
}

export function Board({ initialGameObject, testId = `board` }: Props) {
  const [gameObject, setGameObject] = useState<GameObject>(initialGameObject)

  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-screen bg-slate-200"
      data-testid={testId}
    >
      <div className="grid items-center justify-center grid-cols-1 grid-rows-1">
        {/* board cells */}
        <div className="grid grid-cols-8 w-[1000px] h-[1000px] shadow-xl/.5 col-start-1 row-start-1 pointer-events-none">
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
                  <span className="opacity-30">{`${cell.position.join(
                    ''
                  )}`}</span>
                </div>
              )
            })
          )}
        </div>

        {/* Piece cells */}
        <div className="grid grid-cols-8 grid-rows-8 w-[1000px] h-[1000px] shadow-xl/.5 col-start-1 row-start-1">
          {gameObject.pieces.map(piece => {
            const piecePositionClassName =
              resolveGridPositionClassNameFromBoardPosition(piece.position)

            return (
              <div
                data-testid="piece"
                id={`piece-${piece.id}`}
                className={`flex items-center justify-center cursor-grab hover:bg-amber-500 ${piecePositionClassName}`}
                key={piece.id}
              >
                {piece.name}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
