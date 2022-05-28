import { render, screen } from '@testing-library/react'
import { resolveGridPositionClassNameFromBoardPosition } from 'src/lib/board'
import { generateGameObject } from 'src/lib/game'
import { Board } from './Board'

describe(`Board`, () => {
  const gameObject = generateGameObject()

  it(`renders the root`, () => {
    render(<Board initialGameObject={gameObject} />)
    expect(screen.getByTestId(`board`)).toBeVisible()
  })

  it('renders out 64 board cells', () => {
    render(<Board initialGameObject={gameObject} />)
    expect(screen.getAllByTestId('board-cell').length).toEqual(64)
  })

  it('places all board pieces in their correct positions', () => {
    expect.assertions(gameObject.pieces.length)

    render(<Board initialGameObject={gameObject} />)

    gameObject.pieces.forEach(piece => {
      const piecePositionClassName =
        resolveGridPositionClassNameFromBoardPosition(piece.position)

      const pieceElem = document.getElementById(`piece-${piece.id}`)
      expect(pieceElem).toHaveClass(piecePositionClassName)
    })
  })
})
