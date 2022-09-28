import { Component } from '@/types'

export interface Props extends Component {}

export function GameOverModal({
  className = ``,
  testId = `game-over-modal`,
}: Props) {
  return (
    <dialog
      open
      className={`p-8 text-white bg-black shadow-xl ${className}`}
      data-testid={testId}
    >
      <h1 className="font-semibold">GAME OVER</h1>
    </dialog>
  )
}
