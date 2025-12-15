import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { initialState, PickAndPlayAction, pickAndPlayReducer, PickAndPlayState } from "./pick-and-play.reducer";

interface PickAndPlayContextValue {
  state: PickAndPlayState;
  dispatch: Dispatch<PickAndPlayAction>;
}

const PickAndPlayContext = createContext<PickAndPlayContextValue | null>(null);

export function PickAndPlayProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pickAndPlayReducer, initialState);

  return (
    <PickAndPlayContext.Provider value={{ state, dispatch }}>
      {children}
    </PickAndPlayContext.Provider>
  );
}

export function usePickAndPlay() {
  const ctx = useContext(PickAndPlayContext);
  if (!ctx)
    throw new Error("usePickAndPlay must be used within PickAndPlayProvider");
  return ctx;
}