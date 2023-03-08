import { StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";
import React, { useContext } from "react";
import CustomCard from "./CustomCard";
import { ApiContext } from "../context/ApiContext";
import { UserContext } from "../context/UserContext";
import { showToast } from "./../utils/toastUtils";

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
      id: selectedMemory.id,
    };
    const { success } = await addFavouriteMemory(
      userContext?.userData?.userId,
      dataToSend
    );
    if (!success) {
      Alert.alert("Something went wrong");
    } else {
      showToast({ heading: "Favourite Added", time: 3000 });
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
          console.log(eachMemory.title, " -- ", eachMemory.isLiked);

          return (
            <CustomCard
              key={i}
              title={eachMemory?.title || "N/A"}
              description={eachMemory?.description || "N/A"}
              style={styles.cardStyle}
              onPressFavourite={() => favouriteHandler(eachMemory)}
              isLiked={eachMemory?.isLiked}
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
