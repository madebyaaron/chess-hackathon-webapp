import { Board } from '@/views/Board'
import { generateBoard } from 'src/lib/board'
import { generatePieces } from 'src/lib/piece'
import { GameObject } from '@/types'

const initialGameObject: GameObject = {
  status: 'ready',
  boardRows: generateBoard(),
  pieces: generatePieces(),
}

function Home() {
  return <Board initialGameObject={initialGameObject} />
}

export default Home
