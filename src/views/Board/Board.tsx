import { Component, GameObject } from '@/types'
import { useState } from 'react'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { BoardPieces } from './Board.Pieces'
import { BoardUnderlay } from './Board.Underlay'

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
        <BoardPieces
          gameObject={gameObject}
          className="col-start-1 row-start-1"
        />
        <BoardUnderlay
          gameObject={gameObject}
          className="col-start-1 row-start-1"
        />
      </div>
    </div>
  )
}
