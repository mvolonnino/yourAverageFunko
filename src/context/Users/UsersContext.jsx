import { createContext, useReducer } from "react";
import usersReducer, { usersInitState } from "./usersReducer";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(usersReducer, usersInitState);

  return (
    <UsersContext.Provider value={{ usersState, usersDispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
