import { createContext, useState } from "react";

const OPERATIONS = [
  '000000',
  '000010',
  '000100',
  '100011',
  '101011'
];

export const OperationsContext = createContext();

export function OperationsManager({children}) {
  const [operations, setOperations] = useState([...OPERATIONS]);

  const saveOperations = (newSignals) => {
    setOperations(newSignals);
  }

  return <OperationsContext.Provider value={{operations, saveOperations}}>
    {children}
  </OperationsContext.Provider>
}
