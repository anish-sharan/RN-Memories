import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userContext, setUserContext] = useState({});
  return (
    <DataContext.Provider
      value={{
        userContext,
        setUserContext,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default UserContextProvider;