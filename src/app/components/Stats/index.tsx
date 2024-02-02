import React from 'react'
import { styled } from 'styled-components'
import { resetStatsAction, statsData } from '../../store/slices/statsSlice'
import { useDispatch } from 'react-redux'

const Stats: React.FC = () => {
  const stats = statsData()
  const dispatch = useDispatch()

  const resetStats = () => {
    dispatch(resetStatsAction())
  }

  return (
    <Container>
      <Title>Scoreboard:</Title>
      <Row>
        <div>
          <div style={{ color: '#edaf1d', fontSize: 22 }}>Player 1</div>
          <Count>{stats.winsCount1}</Count>
        </div>
        <div>
          <div style={{ color: '#00ddff', fontSize: 22 }}>Player 2</div>
          <Count>{stats.winsCount2}</Count>
        </div>
      </Row>
      <ResetButton onClick={resetStats}>Reset score</ResetButton>
    </Container>
  )
}

const ResetButton = styled.button`
  background: transparent;
  border: none;
  color: #750000;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #d73939;
  }
`

const Count = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 18px;
`

const Row = styled.div`
  display: flex;
  gap: 15px;
`

const Title = styled.div`
  font-size: 24px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc((100vw - 600px) / 2);
  color: #fff;
  gap: 15px;
  align-items: center;
`

export default Stats
