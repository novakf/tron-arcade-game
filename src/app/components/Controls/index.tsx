import React from 'react'
import { styled } from 'styled-components'
import ArrowDown from '../../icons/ArrowDownIcon'
import ArrowUp from '../../icons/ArrowUpIcon'
import ArrowLeft from '../../icons/ArrowLeftIcon'
import ArrowRight from '../../icons/ArrowRightIcon'

const Controls: React.FC = () => {
  return (
    <Container>
      <Block>
        <Title style={{color: '#edaf1d'}}>Player 1</Title>
        <Button>W</Button>
        <Row>
          <Button>A</Button>
          <Button>S</Button>
          <Button>D</Button>
        </Row>
      </Block>
      <Block>
        <Title  style={{color: '#00ddff'}}>Player 2</Title>
        <Button>
          <ArrowUp />
        </Button>
        <Row>
          <Button>
            <ArrowLeft />
          </Button>
          <Button>
            <ArrowDown />
          </Button>
          <Button>
            <ArrowRight />
          </Button>
        </Row>
      </Block>
    </Container>
  )
}

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 40px;
  border: 1px solid;
  border-radius: 10px;

  &:hover {
    color: #000;
    background: #ddd;

    svg {
      fill: #000;
    }
  }
`

const Row = styled.div`
  display: flex;
  gap: 10px;
`

const Title = styled.div`
  font-size: 24px;
`

const Block = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  width: calc((100vw - 600px) / 2);
  flex-direction: column;
  color: #fff;
  gap: 60px;
`

export default Controls
