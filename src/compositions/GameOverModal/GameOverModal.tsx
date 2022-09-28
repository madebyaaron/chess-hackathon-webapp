import { Component } from '@/types'
import { useGameObject } from 'src/stores/GameObjectStore'

export interface Props extends Component {}

export function GameOverModal({
  className = ``,
  testId = `game-over-modal`,
}: Props) {
  const [game] = useGameObject()

  if (game.status !== `gameOver`) return null

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black opacity-50" />
      <dialog
        open
        className={`p-8 text-white bg-black shadow-xl ${className}`}
        data-testid={testId}
      >
        <h1 className="font-semibold">GAME OVER</h1>
      </dialog>
    </div>
  )
}
