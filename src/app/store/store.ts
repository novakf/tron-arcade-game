import { combineReducers, configureStore } from '@reduxjs/toolkit'
import statsReducer from './slices/statsSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'stats',
  storage,
}

const persistedReducer = persistReducer(persistConfig, statsReducer)

const rootReducer = combineReducers({
  statsInfo: persistedReducer,
})

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof rootReducer>

export const persistor = persistStore(store)
