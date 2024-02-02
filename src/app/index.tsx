import React from 'react'
import './styles.scss'
import { styled } from 'styled-components'
import logo from './assets/tron-logo.jpg'
import Game from './components/Game'
import Controls from './components/Controls'

const App: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logo} />
      </Logo>
      <GameBlock>
        <Controls />
        <Game />
      </GameBlock>
      <Hint>AVOID HITTING LIGHT TRACES AND WALLS</Hint>
    </Container>
  )
}

const Hint = styled.div`
  display: flex;
  justify-content: center;
  color: #694500;
  font-size: 20px;
  margin-bottom: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const GameBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100%;
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
