import { create } from 'zustand'
import { generateBoard } from 'src/lib/board'
import {
  ensureAttackIsValid,
  ensureNewPositionIsValid,
  generatePieces,
  promotePieceIfValid,
  resolveValidPieceAttacks,
  resolveValidPieceMoves,
} from 'src/lib/piece'
import {
  Piece,
  GameObject,
  BoardPosition,
  AttackHistoryEvent,
  MoveHistoryEvent,
} from '@/types'
import { switchPlayer } from 'src/utils/switchPlayer'

export const useGameObjectStore = create<GameObject>(set => ({
  status: `ready`,
  playerTurn: `white`,
  boardRows: generateBoard(),
  pieces: generatePieces(),
  validMoves: [],
  validAttacks: [],
  history: [],
  selectedPiece: undefined,
  onSelectAction: (piece: Piece | undefined) =>
    set((state: GameObject) => resolveSelectAction(piece, state)),
  onAttackAction: (piece: Piece, enemyPiece: Piece) =>
    set((state: GameObject) => resolveAttackAction(piece, enemyPiece, state)),
  onMoveAction: (piece: Piece, position: BoardPosition) =>
    set((state: GameObject) => resolveMoveAction(piece, position, state)),
}))

function resolveSelectAction(
  selectedPiece: Piece | undefined,
  state: GameObject
) {
  const isPieceSelected = selectedPiece !== undefined

  if (!isPieceSelected) {
    return {
      ...state,
      selectedPiece: undefined,
      validMoves: [],
      validAttacks: [],
    }
  }

  if (selectedPiece?.player !== state.playerTurn) return state

  const doesPieceBelongToCurrentPlayer =
    selectedPiece?.player === state.playerTurn
  if (!doesPieceBelongToCurrentPlayer) return state

  const validMoves: BoardPosition[] = resolveValidPieceMoves(
    selectedPiece,
    state
  )

  const validAttacks: Piece[] = resolveValidPieceAttacks(selectedPiece, state)

  return {
    ...state,
    selectedPiece,
    validMoves,
    validAttacks,
  } as GameObject
}

function resolveAttackAction(
  selectedPiece: Piece,
  enemyPiece: Piece,
  state: GameObject
) {
  if (selectedPiece?.player !== state.playerTurn) return state

  const isValidAttack = ensureAttackIsValid(selectedPiece, enemyPiece, state)
  if (!isValidAttack) return state

  const updatedPieces = state.pieces.map(piece => {
    if (piece.id === enemyPiece.id) {
      const updatedEnemyPiece = { ...piece, status: `taken` } as Piece
      return updatedEnemyPiece
    }

    if (piece.id === selectedPiece.id) {
      const updatedSelectedPiece = {
        ...piece,
        position: enemyPiece.position,
      } as Piece

      return updatedSelectedPiece
    }

    return piece
  })

  const attackHistoryEvent: AttackHistoryEvent = {
    action: `attack`,
    pieceId: selectedPiece.id,
    currentPosition: selectedPiece.position,
    targetPosition: enemyPiece.position,
    targetPieceId: enemyPiece.id,
  }

  const history = [...state.history, attackHistoryEvent]
  const status = resolveStatus(state, enemyPiece.name === `king`)

  const playerTurn = switchPlayer(state.playerTurn)

  const updatedGame = promotePieceIfValid(
    state,
    updatedPieces,
    enemyPiece.position
  )

  return {
    ...updatedGame,
    status,
    validMoves: [],
    validAttacks: [],
    history,
    playerTurn,
  }
}

function resolveMoveAction(
  piece: Piece,
  position: BoardPosition,
  state: GameObject
) {
  const selectedPiece = piece
  const targetPosition = position

  const isTargetPositionSameAsCurrentPosition =
    selectedPiece.position.join(``) === targetPosition.join(``)
  if (isTargetPositionSameAsCurrentPosition) return state

  const isValidMove = ensureNewPositionIsValid(selectedPiece, position, state)

  if (!isValidMove) return state

  const pieces = state.pieces.map(piece => {
    const isTargetPiece = piece === selectedPiece
    if (!isTargetPiece) return piece

    return {
      ...piece,
      position,
      status: `inPlay`,
    } as Piece
  })

  const moveHistoryEntry: MoveHistoryEvent = {
    action: `move`,
    pieceId: selectedPiece.id,
    targetPosition: targetPosition,
    currentPosition: selectedPiece.position,
    player: state.playerTurn,
  }
  const history = [...state.history, moveHistoryEntry]

  const playerTurn = switchPlayer(state.playerTurn)

  const updatedGame = promotePieceIfValid(state, pieces, targetPosition)

  return {
    ...updatedGame,
    selectedPiece: undefined,
    history,
    validMoves: [],
    validAttacks: [],
    playerTurn,
  }
}

function resolveStatus(
  game: GameObject,
  isKingTaken: boolean
): GameObject[`status`] {
  const playerTurn = game.playerTurn

  if (!isKingTaken) return `ready`

  if (playerTurn === `white`) return `whiteWon`
  if (playerTurn === `black`) return `blackWon`

  return game.status
}
