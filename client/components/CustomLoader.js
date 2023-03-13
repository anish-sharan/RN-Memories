import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../assets/Colors";
import React from "react";

const CustomLoader = () => {
  return (
    <View style={styles.containerBackground}>
      <View style={styles.loaderBackground}>
        <ActivityIndicator color={Colors.white} size="large" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  loaderBackground: {
    backgroundColor: "rgba(1,1,1,0.7)",
    width: "30%",
    height: "12%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  loaderText: {
    width: "100%",
    color: Colors.white,
    marginTop: 20,
    textAlign: "center",
    fontSize: 15
  },
});

export default CustomLoader;
