import React from 'react';
import ApiContextProvider from './context/ApiContext';
import UserContext from './context/UserContext';
import MemoryContext from './context/MemoryContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <MemoryContext>
      <UserContext>
        <ApiContextProvider>
          <AppNavigator />
        </ApiContextProvider>
      </UserContext>
    </MemoryContext>
  );
}

export default App;