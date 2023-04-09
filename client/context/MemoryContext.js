import React, { createContext, useState } from "react";

export const MemoryContext = createContext();

function MemoryContextProvider({ children }) {
    const [memoryContext, setMemoryContext] = useState({});
    return (
        <MemoryContext.Provider
            value={{
                memoryContext,
                setMemoryContext,
            }}
        >
            {children}
        </MemoryContext.Provider>
    );
}

export default MemoryContextProvider;