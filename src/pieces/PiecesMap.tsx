import { PieceName } from '@/types'

type PageBuilderMap = {
  [property in PieceName]: React.FC
}

export const pageBuilderMap: PageBuilderMap = {
  pawn: () => <div>Pawn</div>,
}
