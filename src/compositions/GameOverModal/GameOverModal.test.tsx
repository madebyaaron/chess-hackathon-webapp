import { render, screen } from "@testing-library/react"
import { GameOverModal } from "./GameOverModal"
import { gameOverModalMockProps } from "./GameOverModal.mockProps"

describe(`GameOverModal`, () => {
  it(`renders the root`, () => {
    render(<GameOverModal {...gameOverModalMockProps} />)
    expect(screen.getByTestId(`game-over-modal`)).toBeVisible()
  })
})
