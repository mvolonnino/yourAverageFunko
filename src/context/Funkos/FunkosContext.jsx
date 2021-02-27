import { createContext, useReducer } from "react";
import funkoReducer, { funkoInitState } from "./funkoReducer";

export const FunkosContext = createContext();

export const FunkosProvider = ({ children }) => {
  const [funkoState, funkoDispatch] = useReducer(funkoReducer, funkoInitState);

  return (
    <FunkosContext.Provider value={{ funkoState, funkoDispatch }}>
      {children}
    </FunkosContext.Provider>
  );
};
