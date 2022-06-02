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

  const isHighlighted = gameObject.selectedPiece === piece

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

  const variants = {
    white: {
      initial: `bg-white border-2 font-bold border-slate-700 text-slate-700`,
      selected: `bg-white border-2 font-bold border-slate-700 bg-rose-300 `,
    },
    black: {
      initial: `text-white bg-slate-700 border-2 border-white font-semibold`,
      selected: `bg-rose-700 text-white  border-2 border-white  font-semibold`,
    },
  }

  return (
    <div
      data-testid={testId}
      id={`piece-${piece.id}`}
      className={`flex items-center justify-center cursor-pointer pointer-events-auto ${
        isHighlighted ? `` : ``
      } ${piecePositionClassName} ${className}`}
      key={piece.id}
      onClick={e => handlePieceClick(piece, e)}
    >
      <span
        className={`inline-block pt-2 pb-2.5 px-4 leading-none rounded-[2em] ${
          isHighlighted
            ? variants[piece.player].selected
            : variants[piece.player].initial
        }`}
      >
        {piece.name}
      </span>
    </div>
  )
}
