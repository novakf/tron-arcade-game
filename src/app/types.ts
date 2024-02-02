export type PointType = {
  x: number
  y: number
}

export type DirectionType = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

export type StatsType = {
  winsCount1: number
  winsCount2: number
}

export const RotateDegrees = {
  ArrowUp: 90,
  ArrowDown: -90,
  ArrowLeft: 0,
  ArrowRight: 180,
}
