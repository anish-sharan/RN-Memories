import { StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";
import React, { useContext } from "react";
import CustomCard from "./CustomCard";
import { ApiContext } from "../context/ApiContext";
import { UserContext } from "../context/UserContext";

const MemoryList = ({
  containerStyle,
  memoryToDisplay,
  refresh,
  refreshFunction,
  addRefreshControl = true,
}) => {
  const { addFavouriteMemory } = useContext(ApiContext);
  const { userContext } = useContext(UserContext);

  const favouriteHandler = async (selectedMemory) => {
    const dataToSend = {
      id: selectedMemory._id,
    };
    const { success } = await addFavouriteMemory(
      userContext?.userData?.userId,
      dataToSend
    );
    if (!success) {
      Alert.alert("Something went wrong");
    }
  };

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
              onPressFavourite={(maddFavouriteMemory) =>
                favouriteHandler(eachMemory)
              }
              isLiked={eachMemory.isLiked}
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
