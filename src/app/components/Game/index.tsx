import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { DirectionType, PointType, RotateDegrees } from '../../types'
import { useInterval } from '../../utils'
import Cycle from '../../icons/cycle'

const Game: React.FC = () => {
  const [positionX, setPositionX] = useState(300)
  const [positionY, setPositionY] = useState(0)
  const [points, setPoints] = useState<PointType[]>([{ x: 300, y: 0 }])
  const [direction, setDirection] = useState<DirectionType>('ArrowUp')

  const [interval, setInterval] = useState<number | null>(10)

  const restart = () => {
    setPoints([{ x: 300, y: 0 }])
    setPositionX(300)
    setPositionY(0)
    setDirection('ArrowUp')
    setInterval(10)
  }

  useInterval(() => {
    if (direction === 'ArrowUp') setPositionY(positionY + 3)
    if (direction === 'ArrowDown') setPositionY(positionY - 3)
    if (direction === 'ArrowLeft') setPositionX(positionX - 3)
    if (direction === 'ArrowRight') setPositionX(positionX + 3)
  }, interval)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e.key)
      if (e.key === 'ArrowUp' && direction !== 'ArrowDown') setDirection(e.key)
      if (e.key === 'ArrowDown' && direction !== 'ArrowUp') setDirection(e.key)
      if (e.key === 'ArrowLeft' && direction !== 'ArrowRight') setDirection(e.key)
      if (e.key === 'ArrowRight' && direction !== 'ArrowLeft') setDirection(e.key)

      if (e.key === 'Enter') restart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [direction])

  useEffect(() => {
    const i = points.findIndex((point) => point.x === positionX && point.y === positionY)

    if (
      (direction === 'ArrowRight' && positionX === 600) ||
      (direction === 'ArrowUp' && positionY === 600) ||
      (direction === 'ArrowLeft' && positionX === 0) ||
      (direction === 'ArrowDown' && positionY === 0) ||
      (i > -1 && i !== points.length - 1)
    ) {
      setInterval(null)
    } else setPoints((prev) => [...prev, { x: positionX, y: positionY }])
  }, [positionX, positionY])

  return (
    <Container>
      {interval ? (
        points.map((point, i) => {
          return (
            <Point key={i} x={point.x} y={point.y}>
              {i === points.length - 1 && <StyledCycle rotatedeg={RotateDegrees[direction]} />}
            </Point>
          )
        })
      ) : (
        <Restart>
          <button onClick={restart}>Restart?</button>
        </Restart>
      )}
    </Container>
  )
}

const StyledCycle = styled(Cycle)<{ rotatedeg: number }>`
  position: absolute;
  width: 40px;
  height: fit-content;
  transform: rotate(${(p) => p.rotatedeg}deg);
  transition: all 0.3s;

  ${(props) =>
    props.rotatedeg === 90 &&
    `
    left: -18px;
    top: -28px;
  `}
  ${(props) =>
    props.rotatedeg === 0 &&
    `
    left: -38px;
    top: -8px;
  `}
  ${(props) =>
    props.rotatedeg === -90 &&
    `
    left: -19px;
    top: 8px;
  `}
  ${(props) =>
    props.rotatedeg === 180 &&
    `
    top: -8px;
  `}
`

const Point = styled.div<{ x: number; y: number }>`
  width: 3px;
  height: 3px;
  position: absolute;
  top: calc(600px - ${(props) => props.y}px);
  left: ${(props) => props.x}px;
  background: #00ddff;
`

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border: 3px solid #006595;
  margin: 0 auto;
  background: #000216;
`

const Restart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  button {
    background: transparent;
    border: none;
    font-size: 30px;
    color: aqua;
    cursor: pointer;

    &:hover {
      color: #009bb7;
    }
  }
`

export default Game
