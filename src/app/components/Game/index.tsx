import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { DirectionType, PointType } from '../../types'
import { clearBoard, drawPoint, useInterval } from '../../utils'
import { useDispatch } from 'react-redux'
import { setFirstWinsDataAction, setSecondWinsDataAction } from '../../store/slices/statsSlice'

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)

  const dispatch = useDispatch()

  const [winner, setWinner] = useState('')
  const [firstPositionX, setFirstPositionX] = useState(300)
  const [firstPositionY, setFirstPositionY] = useState(550)
  const [firstPoints, setFirstPoints] = useState<PointType[]>([{ x: 300, y: 550 }])
  const [firstDirection, setFirstDirection] = useState<DirectionType>('ArrowUp')

  const [secondPositionX, setSecondPositionX] = useState(300)
  const [secondPositionY, setSecondPositionY] = useState(50)
  const [secondPoints, setSecondPoints] = useState<PointType[]>([{ x: 300, y: 50 }])
  const [secondDirection, setSecondDirection] = useState<DirectionType>('ArrowDown')

  const [interval, setInterval] = useState<number | null>(5)

  const restart = () => {
    setFirstPoints([{ x: 300, y: 550 }])
    setFirstPositionX(300)
    setFirstPositionY(550)
    setFirstDirection('ArrowUp')
    setSecondPoints([{ x: 300, y: 50 }])
    setSecondPositionX(300)
    setSecondPositionY(50)
    setSecondDirection('ArrowDown')
    setInterval(5)
    clearBoard(context)
  }

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'))
    drawPoint(context, firstPoints, '#00ddff')
    drawPoint(context, secondPoints, '#edaf1d')
  }, [context, firstPositionX, firstPositionY, secondPositionX, secondPositionY])

  useInterval(() => {
    if (firstDirection === 'ArrowUp') setFirstPositionY(firstPositionY - 1)
    if (firstDirection === 'ArrowDown') setFirstPositionY(firstPositionY + 1)
    if (firstDirection === 'ArrowLeft') setFirstPositionX(firstPositionX - 1)
    if (firstDirection === 'ArrowRight') setFirstPositionX(firstPositionX + 1)
    if (secondDirection === 'ArrowUp') setSecondPositionY(secondPositionY - 1)
    if (secondDirection === 'ArrowDown') setSecondPositionY(secondPositionY + 1)
    if (secondDirection === 'ArrowLeft') setSecondPositionX(secondPositionX - 1)
    if (secondDirection === 'ArrowRight') setSecondPositionX(secondPositionX + 1)
  }, interval)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && firstDirection !== 'ArrowDown') setFirstDirection(e.key)
      if (e.key === 'ArrowDown' && firstDirection !== 'ArrowUp') setFirstDirection(e.key)
      if (e.key === 'ArrowLeft' && firstDirection !== 'ArrowRight') setFirstDirection(e.key)
      if (e.key === 'ArrowRight' && firstDirection !== 'ArrowLeft') setFirstDirection(e.key)

      if (e.key === 'w' && secondDirection !== 'ArrowDown') setSecondDirection('ArrowUp')
      if (e.key === 's' && secondDirection !== 'ArrowUp') setSecondDirection('ArrowDown')
      if (e.key === 'a' && secondDirection !== 'ArrowRight') setSecondDirection('ArrowLeft')
      if (e.key === 'd' && secondDirection !== 'ArrowLeft') setSecondDirection('ArrowRight')

      if (e.key === 'Enter') restart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [firstDirection, secondDirection])

  useEffect(() => {
    const selfCrashed1 = firstPoints.findIndex(
      (point) => point.x === firstPositionX && point.y === firstPositionY
    )

    const firstCrashed = secondPoints.findIndex(
      (point) => point.x === firstPositionX && point.y === firstPositionY
    )

    const selfCrashed2 = secondPoints.findIndex(
      (point) => point.x === secondPositionX && point.y === secondPositionY
    )

    const secondCrashed = firstPoints.findIndex(
      (point) => point.x === secondPositionX && point.y === secondPositionY
    )

    if (firstCrashed > -1 && secondCrashed === -1) {
      setWinner('Player1')
      dispatch(setFirstWinsDataAction())
    }
    if (secondCrashed > -1 && firstCrashed === -1) {
      setWinner('Player2')
      dispatch(setSecondWinsDataAction())
    }
    if (firstCrashed > -1 && secondCrashed > -1) setWinner('Nobody')

    if (
      (firstDirection === 'ArrowRight' && firstPositionX >= 600) ||
      (firstDirection === 'ArrowDown' && firstPositionY >= 600) ||
      (firstDirection === 'ArrowLeft' && firstPositionX <= 0) ||
      (firstDirection === 'ArrowUp' && firstPositionY <= 0) ||
      (secondDirection === 'ArrowRight' && secondPositionX >= 600) ||
      (secondDirection === 'ArrowDown' && secondPositionY >= 600) ||
      (secondDirection === 'ArrowLeft' && secondPositionX <= 0) ||
      (secondDirection === 'ArrowUp' && secondPositionY <= 0) ||
      (selfCrashed1 > -1 && selfCrashed1 < firstPoints.length - 1) ||
      (selfCrashed2 > -1 && selfCrashed2 < secondPoints.length - 1) ||
      firstCrashed > -1 ||
      secondCrashed > -1
    ) {
      setInterval(null)
    } else {
      setFirstPoints((prev) => [...prev, { x: firstPositionX, y: firstPositionY }])
      setSecondPoints((prev) => [...prev, { x: secondPositionX, y: secondPositionY }])
    }
  }, [firstPositionX, firstPositionY, secondPositionX, secondPositionY])

  console.log(winner)

  return interval ? (
    <Canvas ref={canvasRef} width={600} height={600} />
  ) : (
    <Container>
      <Restart>
        <Winner
          $color={winner === 'Player1' ? '#edaf1d' : winner === 'Player2' ? '#00ddff' : '#fff'}
        >
          <span>{winner}</span>
          wins!
        </Winner>
        <button onClick={restart}>Restart?</button>
      </Restart>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border: 3px solid #006595;
  background: #000216;
`

const Canvas = styled.canvas`
  position: relative;
  border: 3px solid #006595;
  background: #000216;
`

const Winner = styled.div<{ $color: string }>`
  color: #fff;
  display: flex;
  gap: 5px;

  span {
    color: ${(props) => props.$color};
  }
`

const Restart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 100%;
  gap: 20px;

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
