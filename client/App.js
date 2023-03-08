import React from "react";
import ApiContextProvider from "./context/ApiContext";
import UserContext from "./context/UserContext";
import MemoryContext from "./context/MemoryContext";
import AppNavigator from "./navigation/AppNavigator";
// import Toast from "react-native-toast-message";

const App = () => {
  return (
    <MemoryContext>
      <UserContext>
        <ApiContextProvider>
          <AppNavigator />
          {/* <Toast /> */}
        </ApiContextProvider>
      </UserContext>
    </MemoryContext>
  );
};

export default App;
