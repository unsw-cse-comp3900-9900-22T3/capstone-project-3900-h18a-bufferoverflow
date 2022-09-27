import { createContext, useContext, useEffect, useState } from "react"
import { initialStore, StoreProps } from "./schema"

const StoreContext = createContext<StoreProps>(initialStore)
const StoreUpdateContext = createContext<(arg: StoreProps) => void>(() => null)

export const useStore = () => {
  return useContext(StoreContext)
}

export const useStoreUpdate = () => {
  return useContext(StoreUpdateContext)
}

export const StoreProvider = (props: {
  children: JSX.Element | JSX.Element[]
}) => {

  const [state, setState] = useState<StoreProps>(initialStore)

  const update = (newStore: Partial<StoreProps>) => {
    const newState = { ...state, ...newStore }
    setState(newState)
    localStorage.setItem('store', JSON.stringify(newState))
  }

  useEffect(() => {
    let stored = localStorage.getItem('store')
    if (stored) setState(JSON.parse(stored))
  }, [])

  return (
    <StoreContext.Provider value={state}>
      <StoreUpdateContext.Provider value={update}>
        {props.children}
      </StoreUpdateContext.Provider>
    </StoreContext.Provider>
  )
}