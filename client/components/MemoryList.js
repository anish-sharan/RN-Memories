import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import React from "react";
import CustomCard from "./CustomCard";

const MemoryList = ({
  containerStyle,
  memoryToDisplay,
  refresh,
  refreshFunction,
  addRefreshControl = true,
}) => {
  return (
    <ScrollView
      style={containerStyle}
      refreshControl={
        addRefreshControl && (
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              refreshFunction && refreshFunction();
            }}
          />
        )
      }
    >
      {memoryToDisplay &&
        memoryToDisplay instanceof Array &&
        memoryToDisplay.length > 0 &&
        memoryToDisplay?.map((eachMemory, i) => {
          return (
            <CustomCard
              key={i}
              title={eachMemory.title}
              description={eachMemory.description}
              style={styles.cardStyle}
            />
          );
        })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  cardStyle: {
    marginVertical: 10,
  },
});

export default MemoryList;
