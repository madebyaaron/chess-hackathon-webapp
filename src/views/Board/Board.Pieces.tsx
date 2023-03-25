import { Piece } from 'src/compositions/Piece'
import { Component } from '@/types'
import { useGameObjectStore } from 'src/stores/zustandStore'

interface Props extends Component {}

export function BoardPieces({
  className = ``,
  testId = `board-pieces`,
}: Props) {
  // const pieces = useGameObjectStore(({ pieces }) => pieces)
  const pieces = useGameObjectStore(state => state.pieces)

  return (
    <div
      className={`grid grid-cols-8 grid-rows-8 shadow-xl/.5 col-start-1 row-start-1 pointer-events-none ${className}`}
      data-testid={testId}
    >
      {pieces
        .filter(piece => [`inPlay`, `init`].includes(piece.status))
        .map(piece => {
          return <Piece key={piece.id} piece={piece} />
        })}
    </div>
  )
}
