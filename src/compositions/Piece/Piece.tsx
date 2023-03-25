import { Component, Piece as PieceInterface } from '@/types'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { useGameObjectStore } from 'src/stores/zustandStore'

interface Props extends Component {
  piece: PieceInterface
  disabled?: boolean
}

export function Piece({
  piece,
  className = ``,
  disabled = false,
  testId = `piece`,
}: Props) {
  const piecePositionClassName = resolveGridPositionClassNameFromBoardPosition(
    piece.position
  )
  const { playerTurn, selectedPiece, onSelectAction, onAttackAction } =
    useGameObjectStore(state => state)

  const isHighlighted = selectedPiece === piece

  function handlePieceClick(
    piece: PieceInterface,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation()

    const isTargetPieceAnOpponent = piece.player !== playerTurn
    const isTargetPieceSameAsSelectedPiece = piece === selectedPiece
    const isTargetPieceAnUnselectedPlayerPiece =
      !isTargetPieceAnOpponent && !isTargetPieceSameAsSelectedPiece

    if (!onSelectAction) throw new Error(`onSelectAction is not defined`)
    if (!onAttackAction) throw new Error(`onAttackAction is not defined`)

    if (isTargetPieceSameAsSelectedPiece) return onSelectAction(undefined)
    if (isTargetPieceAnUnselectedPlayerPiece && !isTargetPieceAnOpponent)
      return onSelectAction(piece)

    if (isTargetPieceAnOpponent && !!selectedPiece)
      return onAttackAction(selectedPiece, piece)
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
  } as const

  return (
    <button
      data-testid={testId}
      data-position={piece.position.join(`,`)}
      id={`piece-${piece.id}`}
      className={`flex items-center justify-center pointer-events-auto drop-shadow-md ${
        isHighlighted ? `` : ``
      } ${piecePositionClassName} ${className}`}
      key={piece.id}
      onClick={e => handlePieceClick(piece, e)}
      disabled={disabled}
    >
      <span
        className={`inline-block pt-2 pb-2.5 px-3.5 w-[84px] leading-none rounded-[2em] select-none ${
          isHighlighted
            ? variants[piece.player].selected
            : variants[piece.player].initial
        }`}
      >
        {piece.name}
      </span>
    </button>
  )
}
