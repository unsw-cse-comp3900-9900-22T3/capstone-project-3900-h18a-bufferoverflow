import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
import { StoreProps } from "./schema"

const StoreContext = createContext<StoreProps>(null)
const StoreUpdateContext = createContext<Dispatch<SetStateAction<StoreProps>>>(() => null)

export const useStore = () => {
  return useContext(StoreContext)
}

export const useStoreUpdate = () => {
  return useContext(StoreUpdateContext)
}

export const StoreProvider = (props: {
  children: JSX.Element | JSX.Element[]
}) => {

  const [state, setState] = useState<StoreProps>(null)

  return (
    <StoreContext.Provider value={state}>
      <StoreUpdateContext.Provider value={setState}>
        {props.children}
      </StoreUpdateContext.Provider>
    </StoreContext.Provider>
  )
}