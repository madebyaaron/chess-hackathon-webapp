import { createContext, useContext } from 'react'

interface Cell {
  index?: number
}

interface GameObject {
  status: 'loading' | 'ready'
  rows: Cell[][]
  pieces: []
}

const AppContext = createContext()

export function PageStoreWrapper({ children, initialState = {} }) {
  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  )
}

export function usePageStore() {
  return useContext(AppContext)
}
