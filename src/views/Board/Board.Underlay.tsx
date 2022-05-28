import { Component, GameObject } from '@/types'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'

interface Props extends Component {
  gameObject: GameObject
}

export function BoardUnderlay({
  className = '',
  gameObject,
  testId = 'board-underlay',
}: Props) {
  return (
    <div
      className={`grid grid-cols-8 grid-rows-8 w-[1000px] h-[1000px] shadow-xl/.5 col-start-1 row-start-1 ${className}`}
      data-testid={testId}
    >
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
  )
}
