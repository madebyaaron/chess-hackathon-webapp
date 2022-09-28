import { render, screen } from "@testing-library/react"
import { PieceGraveyard } from "./PieceGraveyard"
import { pieceGraveyardMockProps } from "./PieceGraveyard.mockProps"

describe(`PieceGraveyard`, () => {
  it(`renders the root`, () => {
    render(<PieceGraveyard {...pieceGraveyardMockProps} />)
    expect(screen.getByTestId(`piece-graveyard`)).toBeVisible()
  })
})
