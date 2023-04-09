import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import FontSize from "../../assets/FontSize";
import { MemoryContext } from "../../context/MemoryContext";
import { ApiContext } from "../../context/ApiContext";
import { UserContext } from "../../context/UserContext";
import MemoryList from "../../components/MemoryList";
import { useIsFocused } from "@react-navigation/native";

const FavouriteScreen = () => {
  const { getFavouriteMemory } = useContext(ApiContext);
  const { memoryContext } = useContext(MemoryContext);
  const [refreshing, setRefreshing] = useState(false);
  const { userContext } = useContext(UserContext);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    await getFavouriteMemory(userContext?.userData?.userId);
  };

  useEffect(() => {
    if (isFocused && !memoryContext.faouriteMemories) {
      fetchData();
    }
  }, [isFocused]);

  const onRefresh = async () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  return (
    <>
      <MemoryList
        memoryToDisplay={memoryContext?.faouriteMemories ?? []}
        refreshing={refreshing}
        refreshFunction={onRefresh}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: FontSize.Heading,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default FavouriteScreen;
