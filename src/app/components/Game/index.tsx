import React from 'react'
import { styled } from 'styled-components'

const Game: React.FC = () => {
  return (
    <Container>
      {interval ? (
        points.map((point, i) => {
          return <Point key={i} x={point.x} y={point.y} />
        })
      ) : (
        <Restart>
          <button onClick={restart}>Restart?</button>
        </Restart>
      )}
    </Container>
  )
}

const Point = styled.div<{ x: number; y: number }>`
  width: 3px;
  height: 3px;
  position: absolute;
  top: calc(600px - ${(props) => props.y}px);
  left: ${(props) => props.x}px;
  background: #fff;
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
