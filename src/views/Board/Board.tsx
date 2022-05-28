import { Component, GameObject } from '@/types'
import { GameObjectProvider } from 'src/stores/GameObjectStore/GameObjectStore'
// import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { BoardPieces } from './Board.Pieces'
import { BoardGrid } from './Board.Grid'

interface Props extends Component {
  initialGameObject: GameObject
}

export function Board({ initialGameObject, testId = `board` }: Props) {
  return (
    <GameObjectProvider initialGameObject={initialGameObject}>
      <div
        className="flex items-center justify-center w-full h-full min-h-screen bg-slate-200"
        data-testid={testId}
      >
        <div className="grid items-center justify-center grid-cols-1 grid-rows-1">
          <BoardPieces className="z-10 col-start-1 row-start-1" />
          <BoardGrid className="col-start-1 row-start-1" />
        </div>
      </div>
    </GameObjectProvider>
  )
}
