import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userContext, setUserContext] = useState({});
  return (
    <UserContext.Provider
      value={{
        userContext,
        setUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;