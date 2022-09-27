import { BoardPosition, GameObject, MoveHistoryEvent, Piece } from '@/types'
import {
  resolveValidPieceMoves,
  ensureNewPositionIsValid,
  resolveValidPieceAttacks,
  ensureAttackIsValid,
} from 'src/lib/piece'
import { switchPlayer } from 'src/utils/switchPlayer'

export type ReducerAction =
  | { type: `select`; piece: Piece | undefined }
  | { type: `move`; piece: Piece; position: BoardPosition }
  | { type: `attack`; piece: Piece; enemyPiece: Piece }

export function gameObjectReducer(
  game: GameObject,
  action: ReducerAction
): GameObject {
  const selectAction = action.type === `select`
  const moveAction = action.type === `move`
  const attackAction = action.type === `attack`

  if (selectAction) {
    const selectedPiece = action.piece
    const isPieceSelected = selectedPiece !== undefined

    if (!isPieceSelected) {
      return {
        ...game,
        selectedPiece: undefined,
        validMoves: [],
        validAttacks: [],
      }
    }

    const doesPieceBelongToCurrentPlayer =
      selectedPiece?.player === game.playerTurn
    if (!doesPieceBelongToCurrentPlayer) return game

    const validMoves: BoardPosition[] = resolveValidPieceMoves(
      selectedPiece,
      game
    )

    const validAttacks: Piece[] = resolveValidPieceAttacks(selectedPiece, game)

    return {
      ...game,
      selectedPiece,
      validMoves,
      validAttacks,
    } as GameObject
  }

  if (moveAction) {
    const selectedPiece = action.piece
    const targetPosition = action.position

    const isTargetPositionSameAsCurrentPosition =
      selectedPiece.position.join(``) === targetPosition.join(``)
    if (isTargetPositionSameAsCurrentPosition) return game

    const isValidMove = ensureNewPositionIsValid(
      selectedPiece,
      action.position,
      game
    )

    if (!isValidMove) return game

    const pieces = game.pieces.map(piece => {
      const isTargetPiece = piece === selectedPiece
      if (!isTargetPiece) return piece

      return {
        ...piece,
        position: action.position,
        status: `inPlay`,
      } as Piece
    })

    const moveHistoryEntry: MoveHistoryEvent = {
      action: `move`,
      pieceId: selectedPiece.id,
      targetPosition: targetPosition,
      currentPosition: selectedPiece.position,
      player: game.playerTurn,
    }
    const history = [...game.history, moveHistoryEntry]

    const playerTurn = switchPlayer(game.playerTurn)

    return {
      ...game,
      selectedPiece: undefined,
      pieces,
      history,
      validMoves: [],
      validAttacks: [],
      playerTurn,
    }
  }

  if (attackAction) {
    const selectedPiece = action.piece
    const enemyPiece = action.enemyPiece

    const isValidAttack = ensureAttackIsValid(selectedPiece, enemyPiece, game)
    if (!isValidAttack) return game

    const updatedPieces = game.pieces.map(piece => {
      if (piece.id === enemyPiece.id) {
        const updatedPiece = { ...piece, status: `taken` } as Piece
        return updatedPiece
      }

      return piece
    })

    return { ...game, pieces: updatedPieces }

    // const selectedPiece = action.selectedPiece
    // const targetPosition = action.targetPiece
    // const isTargetPositionSameAsCurrentPosition =
    //   selectedPiece.position.join(``) === targetPosition.join(``)
    // if (isTargetPositionSameAsCurrentPosition) return game
    // const isValidMove = ensureNewPositionIsValid(
    //   selectedPiece,
    //   action.position,
    //   game
    // )
    // if (!isValidMove) return game
    // const pieces = game.pieces.map(piece => {
    //   const isTargetPiece = piece === selectedPiece
    //   if (!isTargetPiece) return piece
    //   return {
    //     ...piece,
    //     position: action.position,
    //   }
    // })
    // const moveHistoryEntry: MoveHistoryEvent = {
    //   action: `move`,
    //   pieceId: selectedPiece.id,
    //   targetPosition: targetPosition,
    //   currentPosition: selectedPiece.position,
    //   player: game.playerTurn,
    // }
    // const history = [...game.history, moveHistoryEntry]
    // const playerTurn = switchPlayer(game.playerTurn)
    // return {
    //   ...game,
    //   selectedPiece: undefined,
    //   pieces,
    //   history,
    //   validMoves: [],
    //   playerTurn,
    // }
  }

  return game
}
