import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import MemoryList from "../../components/MemoryList";
import { ApiContext } from "../../context/ApiContext";
import { MemoryContext } from "../../context/MemoryContext";
import CustomStatusBar from "../../components/CustomStatusBar";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ style }) => {
  const { getMemory } = useContext(ApiContext);
  const { memoryContext } = useContext(MemoryContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const allMemories = memoryContext?.memories ?? [];
  const isFocused = useIsFocused();

  const fetchData = async () => {
    await getMemory();
  };

  useEffect(() => {
    if (isFocused && !memoryContext?.memories) {
      fetchData();
    }
  }, [isFocused, memoryContext.memories]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMemory();
    setRefreshing(false);
  };

  return (
    <>
      <CustomStatusBar />
      <MemoryList
        memoryToDisplay={allMemories}
        refreshing={refreshing}
        refreshFunction={onRefresh}
        containerStyle={style}
        isHomeScreen={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default HomeScreen;
