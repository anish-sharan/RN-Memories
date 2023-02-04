import React from "react";
import { StatusBar } from "react-native";

const CustomStatusBar = ({ style, title, description }) => {
  return (
    <>
      <StatusBar barStyle={"light-content"} translucent />
    </>
  );
};

export default CustomStatusBar;
