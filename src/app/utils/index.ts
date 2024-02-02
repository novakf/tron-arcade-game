import { useEffect } from 'react'
import { PointType } from '../types'

export const useInterval = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(callback, delay)
      return () => clearInterval(id)
    }
  }, [callback])
}

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, 600, 600)
  }
}

export const drawPoint = (
  context: CanvasRenderingContext2D | null,
  objectBody: PointType[],
  fillColor: string
) => {
  if (context) {
    objectBody.forEach((object) => {
      context.fillStyle = fillColor
      context?.fillRect(object.x, object.y, 3, 3)
    })
  }
}
