import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { StatsType } from '../../types'

const initialState: StatsType = {
  winsCount1: 0,
  winsCount2: 0,
}

const dataSlice = createSlice({
  name: 'stats',
  initialState: { Data: initialState },
  reducers: {
    increaseFirstWins(state) {
      state.Data.winsCount1 += 1
    },
    increaseSecondWins(state) {
      state.Data.winsCount2 += 1
    },
    resetStats(state) {
      state.Data = initialState
    },
  },
})

export const statsData = () => useSelector((state: RootState) => state.statsInfo.Data)

export const {
  increaseFirstWins: setFirstWinsDataAction,
  increaseSecondWins: setSecondWinsDataAction,
  resetStats: resetStatsAction,
} = dataSlice.actions

export default dataSlice.reducer
