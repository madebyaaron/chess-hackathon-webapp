import { piecesInitialState } from './../../constants/piecesInitialState'
import { BoardPosition, GameObject, Orientation, Piece } from '@/types'
import { orientations } from 'src/constants/orientations'
import { switchPlayer } from 'src/utils/switchPlayer'

const traversalOrientationMap = {
  up: [0, -1],
  'up-right': [1, -1],
  right: [1, 0],
  'down-right': [1, 1],
  down: [0, 1],
  'down-left': [-1, 1],
  left: [-1, 0],
  'up-left': [-1, -1],
}

export function generatePieces(): Piece[] {
  return piecesInitialState
}

export function resolveValidPieceMoves(piece: Piece, game: GameObject) {
  const isPiecesFirstMove = piece.status === `init`
  const movementRange = isPiecesFirstMove
    ? piece.initialMovementRange
    : piece.movementRange

  const positionsInRange = movementRange.map(range => {
    const [x, y] = piece.position
    const [top, right, bottom, left] = range
    const yDistance = top - bottom
    const xDistance = right - left
    return [x + xDistance, y + yDistance] as BoardPosition
  })

  const occupiedPositions = game.pieces
    .filter(p => p.status !== `taken`)
    .map(p => p.position)

  if (piece.name === `knight`)
    return resolveValidKnightPositions(positionsInRange, occupiedPositions)

  return resolveValidNonKnightPositions(
    piece.position,
    positionsInRange,
    occupiedPositions
  )
}

export function resolveValidPieceAttacks(
  selectedPiece: Piece,
  game: GameObject
): Piece[] {
  const attackRange = selectedPiece.attackRange
  const currentPosition = selectedPiece.position
  const occupiedPositions = game.pieces
    .filter(p => p.status !== `taken`)
    .map(p => p.position)
  const closestOccupiedPositions = findClosestOccupiedPositions(
    currentPosition,
    occupiedPositions
  )

  const attacksInRange = attackRange.map(range => {
    const [x, y] = currentPosition
    const [top, right, bottom, left] = range
    const yDistance = top - bottom
    const xDistance = right - left
    return [x + xDistance, y + yDistance] as BoardPosition
  })

  const closestOccupiedPositionStringsArr = Object.values(
    closestOccupiedPositions
  )
    .filter(position => position !== undefined)
    .map(position => position?.join(`,`))

  const closestPieces = game.pieces.filter(piece => {
    const positionString = piece.position.join(`,`)
    const includedInPositionsArr = closestOccupiedPositionStringsArr.some(
      s => s === positionString
    )
    return includedInPositionsArr
  })

  const inRangePieces = closestPieces.filter(piece =>
    attacksInRange.some(
      position => piece.position.join(`,`) === position.join(`,`)
    )
  )

  const inRangeEnemyPieces = inRangePieces.filter(
    piece => piece.player === switchPlayer(game.playerTurn)
  )

  return inRangeEnemyPieces
}

export function resolveValidNonKnightPositions(
  currentPosition: BoardPosition,
  positionsInRange: BoardPosition[],
  occupiedPositions: BoardPosition[]
): BoardPosition[] {
  const closestOccupiedPositions = findClosestOccupiedPositions(
    currentPosition,
    occupiedPositions
  )

  const unobstructedPositions = positionsInRange.filter(
    positionsInRange =>
      !isPositionObstructed(
        currentPosition,
        positionsInRange,
        closestOccupiedPositions
      )
  )

  return unobstructedPositions
}

function resolveValidKnightPositions(
  positionsInRange: BoardPosition[],
  occupiedPositions: BoardPosition[]
) {
  return positionsInRange.filter(positionInRange =>
    occupiedPositions.every(
      occupiedPosition => occupiedPosition.join(``) !== positionInRange.join(``)
    )
  )
}

export function resolveOrientationOfTwoPositions(
  positionOne: BoardPosition,
  positionTwo: BoardPosition
): Orientation {
  const positionOneX = positionOne[0]
  const positionOneY = positionOne[1]
  const positionTwoX = positionTwo[0]
  const positionTwoY = positionTwo[1]

  const isUp = positionTwoY < positionOneY
  const isDown = positionTwoY > positionOneY
  const isLeft = positionTwoX < positionOneX
  const isRight = positionTwoX > positionOneX

  const isDiagonal =
    positionTwoX - positionOneX === positionTwoY - positionOneY ||
    positionTwoX - positionOneX === (positionTwoY - positionOneY) * -1

  if (isUp && !isLeft && !isRight) return `up`
  if (isDown && !isLeft && !isRight) return `down`
  if (isLeft && !isUp && !isDown) return `left`
  if (isRight && !isUp && !isDown) return `right`

  if (isUp && isLeft && isDiagonal) return `up-left`
  if (isUp && isRight && isDiagonal) return `up-right`
  if (isDown && isLeft && isDiagonal) return `down-left`
  if (isDown && isRight && isDiagonal) return `down-right`

  throw new Error(`unable to resolve orientation`)
}

export function ensureNewPositionIsValid(
  piece: Piece,
  position: BoardPosition,
  game: GameObject
) {
  const validPieceMoves = resolveValidPieceMoves(piece, game)
  const doesValidMovesIncludeNewPosition = validPieceMoves.some(
    move => move[0] === position[0] && move[1] === position[1]
  )
  return doesValidMovesIncludeNewPosition
}

export function ensureAttackIsValid(
  piece: Piece,
  enemyPiece: Piece,
  game: GameObject
) {
  const validEnemyPieces = resolveValidPieceAttacks(piece, game)
  const isValidEnemyPiece = validEnemyPieces.some(enemy => enemy === enemyPiece)
  return isValidEnemyPiece
}

export function findClosestOccupiedPositions(
  currentPosition: BoardPosition,
  occupiedPositions: BoardPosition[]
) {
  const obstructionObject = orientations.reduce((obj, orientation) => {
    obj[orientation] = findClosestOccupiedPosition(
      currentPosition,
      occupiedPositions,
      orientation
    )
    return obj
  }, {} as Record<Orientation, BoardPosition | undefined>)

  return obstructionObject
}

export function findClosestOccupiedPosition(
  currentPosition: BoardPosition,
  occupiedPositions: BoardPosition[],
  orientation: Orientation
) {
  return resolveBoardPositionsByOrientation(currentPosition, orientation).find(
    pos => occupiedPositions.some(occPos => occPos.join(``) === pos.join(``))
  )
}

export function resolveBoardPositionsByOrientation(
  position: BoardPosition,
  orientation: Orientation
) {
  const traversalOrientation = traversalOrientationMap[orientation]
  const resolvedPositions = []

  let currentPosition = position

  while (isPositionWithinBounds(currentPosition)) {
    const [currentX, currentY] = currentPosition
    const [adjustmentX, adjustmentY] = traversalOrientation as [number, number]

    const newPosition = [
      currentX + adjustmentX,
      currentY + adjustmentY,
    ] as BoardPosition
    resolvedPositions.push(newPosition)
    currentPosition = newPosition
  }

  return resolvedPositions
}

function isPositionWithinBounds(position: BoardPosition): boolean {
  const isPositionXWithinBounds = position[0] >= 1 && position[0] <= 8
  const isPositionYWithinBounds = position[1] >= 1 && position[1] <= 8
  const isPositionWithinBounds =
    isPositionXWithinBounds && isPositionYWithinBounds
  return isPositionWithinBounds
}

function isPositionObstructed(
  currentPosition: BoardPosition,
  targetPosition: BoardPosition,
  closestOccupiedPositions: Record<Orientation, BoardPosition | undefined>
): boolean {
  const orientation = resolveOrientationOfTwoPositions(
    currentPosition,
    targetPosition
  )
  const occupiedPosition = closestOccupiedPositions[orientation]

  if (!occupiedPosition) return false

  const targetPositionX = targetPosition[0]
  const targetPositionY = targetPosition[1]

  const occupiedPositionX = occupiedPosition[0]
  const occupiedPositionY = occupiedPosition[1]

  if (orientation === `up`) return targetPositionY <= occupiedPositionY
  if (orientation === `down`) return targetPositionY >= occupiedPositionY
  if (orientation === `left`) return targetPositionX <= occupiedPositionX
  if (orientation === `right`) return targetPositionX >= occupiedPositionX

  if (orientation === `up-right`)
    return (
      targetPositionY <= occupiedPositionY &&
      targetPositionX >= occupiedPositionX
    )

  if (orientation === `up-left`)
    return (
      targetPositionY <= occupiedPositionY &&
      targetPositionX <= occupiedPositionX
    )

  if (orientation === `down-right`)
    return (
      targetPositionY >= occupiedPositionY &&
      targetPositionX >= occupiedPositionX
    )

  if (orientation === `down-left`)
    return (
      targetPositionY >= occupiedPositionY &&
      targetPositionX <= occupiedPositionX
    )

  return true
}
