import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./UserStack";
import UnknownUserStack from "./UnkownUserStack";

function AppNavigator() {
  const { userContext } = useContext(UserContext);

  const getCorrectStack = () => {
    // if (userContext?.userData?.token || userContext?.token) {
    if (userContext?.userData?.token) {
      return <UserStack />;
    } else {
      return <UnknownUserStack />;
    }
  };
  return <NavigationContainer>{getCorrectStack()}</NavigationContainer>;
}

export default AppNavigator;
