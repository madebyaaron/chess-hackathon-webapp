import { Component, Piece } from '@/types'
import React from 'react'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { useGameObject } from 'src/stores/GameObjectStore/GameObjectStore'

interface Props extends Component {}

export function BoardPieces({
  className = ``,
  testId = `board-pieces`,
}: Props) {
  const [gameObject, dispatch] = useGameObject()

  function handlePieceClick(
    piece: Piece,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    e.stopPropagation()
    if (piece === gameObject.selectedPiece) return
    dispatch({ type: `SELECT`, piece })
  }

  return (
    <div
      className={`grid grid-cols-8 grid-rows-8 shadow-xl/.5 col-start-1 row-start-1 pointer-events-none ${className}`}
      data-testid={testId}
    >
      {gameObject.pieces.map(piece => {
        const piecePositionClassName =
          resolveGridPositionClassNameFromBoardPosition(piece.position)

        const isSelected = gameObject.selectedPiece === piece

        return (
          <div
            data-testid="piece"
            id={`piece-${piece.id}`}
            className={`flex items-center justify-center cursor-pointer pointer-events-auto ${
              isSelected ? `bg-amber-400` : `hover:bg-amber-500`
            } ${piecePositionClassName}`}
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
      })}
    </div>
  )
}
