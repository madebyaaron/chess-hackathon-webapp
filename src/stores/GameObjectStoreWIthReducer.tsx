export const that = 'boom'
// import { Component, GameObject, Piece } from '@/types'
// import { createContext, useContext, useReducer, Dispatch, Context } from 'react'

// interface gameObjectReducerAction {
//   type: 'select'
//   pieceId?: string
// }

// const GameObjectContext:
//   | Context<null>
//   | Context<[GameObject, Dispatch<gameObjectReducerAction>]> =
//   createContext(null)

// function gameObjectReducer(
//   gameObject: GameObject,
//   action: gameObjectReducerAction
// ) {
//   const actions = {
//     select: () => {
//       if (!action.pieceId) {
//         gameObject.selectedPiece = undefined
//         return gameObject
//       }
//       const resolvedGamePiece: Piece | undefined = gameObject.pieces.find(
//         p => p.id === action.pieceId
//       )
//       gameObject.selectedPiece = resolvedGamePiece
//       return gameObject
//     },
//   }

//   actions[action.type]()

//   return gameObject
// }

// interface Props extends Component {
//   initialGameObject: GameObject
// }

// export function GameObjectStoreProvider({
//   children,
//   initialGameObject,
// }: Props) {
//   return (
//     <GameObjectContext.Provider
//       value={useReducer(gameObjectReducer, initialGameObject)}
//     >
//       {children}
//     </GameObjectContext.Provider>
//   )
// }

// export function useGameObject() {
//   return useContext(GameObjectContext)
// }
