import { createContext, useState } from "react";
import { SIGNALS } from "../DataPathElements/Control/helpers/states";

export const SignalContext = createContext();

export function SignalsManager({children}) {
  const [signals, setSignals] = useState({...SIGNALS});

  const saveSignals = (newSignals) => {
    setSignals(newSignals);
  }

  return <SignalContext.Provider value={{signals, saveSignals}}>
    {children}
  </SignalContext.Provider>
}
