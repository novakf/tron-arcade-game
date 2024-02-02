import React from 'react'
import './styles.scss'
import { styled } from 'styled-components'
import logo from './assets/tron-logo.jpg'
import Game from './components/Game'

const App: React.FC = () => {
  return (
    <Container>
      <Logo>
        <img src={logo} />
      </Logo>
      <GameBlock>
        <Game />
        <Hint>AVOID HITTING LIGHT TRACES AND WALLS</Hint>
      </GameBlock>
    </Container>
  )
}

const Hint = styled.div`
  display: flex;
  justify-content: center;
  color: #694500;
  font-size: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const GameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
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
