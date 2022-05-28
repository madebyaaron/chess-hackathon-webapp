import { render, screen } from "@testing-library/react"
import { Board } from "./Board"

describe(`Board`, () => {
  it(`renders the root`, () => {
    render(<Board />)
    expect(screen.getByTestId(`board`)).toBeVisible()
  })
})
