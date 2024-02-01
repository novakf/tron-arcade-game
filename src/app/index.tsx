import React, { useEffect, useState } from 'react'
import './styles.scss'
import { styled } from 'styled-components'
import logo from './assets/tron-logo.jpg'
import { useInterval } from './utils'
import { PointType } from './types'

const App: React.FC = () => {
  const [positionX, setPositionX] = useState(300)
  const [positionY, setPositionY] = useState(0)
  const [points, setPoints] = useState<PointType[]>([{ x: 300, y: 0 }])
  const [direction, setDirection] = useState('ArrowUp')

  const [interval, setInterval] = useState<number | null>(50)

  const restart = () => {
    setPoints([{ x: 300, y: 0 }])
    setPositionX(300)
    setPositionY(0)
    setDirection('ArrowUp')
    setInterval(50)
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
      if (e.key === 'ArrowLeft' && direction !== 'ArrowRight')
        setDirection(e.key)
      if (e.key === 'ArrowRight' && direction !== 'ArrowLeft')
        setDirection(e.key)

      if (e.key === 'Enter') restart()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [direction])

  useEffect(() => {
    const i = points.findIndex(
      (point) => point.x === positionX && point.y === positionY
    )

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
      <Logo>
        <img src={logo} />
      </Logo>
      <GameBlock>
        <Game>
          {interval ? (
            points.map((point, i) => {
              return <Point key={i} x={point.x} y={point.y} />
            })
          ) : (
            <Restart>
              <button onClick={restart}>Restart?</button>
            </Restart>
          )}
        </Game>
      </GameBlock>
    </Container>
  )
}

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const GameBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const Point = styled.div<{ x: number; y: number }>`
  width: 3px;
  height: 3px;
  position: absolute;
  top: calc(600px - ${(props) => props.y}px);
  left: ${(props) => props.x}px;
  background: #fff;
`

const Game = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border: 3px solid #006595;
  margin: 0 auto;
  background: #000216;
`

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  img {
    width: 300px;
  }
`

export default App
