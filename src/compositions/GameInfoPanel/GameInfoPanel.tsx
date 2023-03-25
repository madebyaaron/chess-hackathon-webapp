import { Component } from '@/types'
import { useEffect } from 'react'
import { useGameObjectStore } from 'src/stores/zustandStore'

export interface Props extends Component {}

export function GameInfoPanel({
  className = ``,
  testId = `game-info-panel`,
}: Props) {
  const { playerTurn } = useGameObjectStore(state => state)

  // useEffect(() => {
  //   console.log(game)
  // }, [game])

  return (
    <div className={`p-8 bg-white shadow-xl ${className}`} data-testid={testId}>
      <div className="flex gap-1 font-mono">
        <div className="font-bold">Player turn:</div>
        <div className="">{playerTurn}</div>
      </div>
    </div>
  )
}
