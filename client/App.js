import React from "react";
import ApiContextProvider from "./context/ApiContext";
import UserContext from "./context/UserContext";
import MemoryContext from "./context/MemoryContext";
import AppNavigator from "./navigation/AppNavigator";
import CustomLoader from "./components/CustomLoader";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";

const App = () => {
  return (
    <SafeAreaProvider>
      <MemoryContext>
        <UserContext>
          <ApiContextProvider>
            <AppNavigator />
            {/* <Toast /> */}
            {/* {true && <CustomLoader />} */}
          </ApiContextProvider>
        </UserContext>
      </MemoryContext>
    </SafeAreaProvider>
  );
};

export default App;
