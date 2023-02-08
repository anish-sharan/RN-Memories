import React, { useContext, useEffect } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import MemoryList from "../../components/MemoryList";
import { ApiContext } from "../../context/ApiContext";
import { MemoryContext } from "../../context/MemoryContext";

const HomeScreen = ({ style }) => {
  const { getMemory } = useContext(ApiContext);
  const { memoryContext } = useContext(MemoryContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const allMemories = memoryContext?.memories ?? [];

  const onRefresh = async () => {
    setRefreshing(true);
    await getMemory();
    setRefreshing(false);
  };

  return (
    <MemoryList
      memoryToDisplay={allMemories}
      refreshing={refreshing}
      refreshFunction={onRefresh}
      containerStyle={style}
    />
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
