import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import FontSize from "../../assets/FontSize";
import { MemoryContext } from "../../context/MemoryContext";
import { ApiContext } from "../../context/ApiContext";
import MemoryList from "../../components/MemoryList";

const FavouriteScreen = () => {
  const { getMemory } = useContext(ApiContext);
  const { memoryContext } = useContext(MemoryContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMemory();
    setRefreshing(false);
  };

  return (
    <>
      <Text style={styles.container}>FAV</Text>
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
