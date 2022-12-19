import React from 'react';
import ApiContextProvider from './context/ApiContext';
import UserContext from './context/UserContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <UserContext>
      <ApiContextProvider>
         <AppNavigator />
      </ApiContextProvider>
    </UserContext>
  );
}

export default App;