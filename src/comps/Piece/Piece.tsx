import { Component, Piece as PieceInterface } from '@/types'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { useGameObject } from 'src/stores/GameObjectStore'

interface Props extends Component {
  piece: PieceInterface
}

export function Piece({ piece, className = ``, testId = `piece` }: Props) {
  const piecePositionClassName = resolveGridPositionClassNameFromBoardPosition(
    piece.position
  )
  const [gameObject, dispatch] = useGameObject()

  const isSelected = gameObject.selectedPiece === piece

  function handlePieceClick(
    piece: PieceInterface,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.stopPropagation()
    if (piece === gameObject.selectedPiece) {
      dispatch({ type: `SELECT`, piece: undefined })
      return
    }

    dispatch({ type: `SELECT`, piece })
  }

  return (
    <div
      data-testid={testId}
      id={`piece-${piece.id}`}
      className={`flex items-center justify-center cursor-pointer pointer-events-auto ${
        isSelected ? `bg-amber-400/50` : ``
      } ${piecePositionClassName} ${className}`}
      key={piece.id}
      onClick={e => handlePieceClick(piece, e)}
    >
      <span
        className={`inline-block pt-2 pb-2.5 px-4 leading-none rounded-[2em] font-semibold ${
          piece.player === `white`
            ? `bg-white text-slate-700 border-2 border-slate-700`
            : `text-white bg-slate-700 border-2 border-white`
        }`}
      >
        {piece.name}
      </span>
    </div>
  )
}
