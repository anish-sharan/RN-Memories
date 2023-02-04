import React, { useContext } from "react";
import { StyleSheet, RefreshControl, ScrollView } from "react-native";
import CustomCard from "../../components/CustomCard";
import CustomStatusBar from "../../components/CustomStatusBar";
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
    <ScrollView
      style={style}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CustomStatusBar />
      {allMemories &&
        allMemories instanceof Array &&
        allMemories.length > 0 &&
        allMemories?.map((eachMemory, i) => {
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
  searchBar: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  cardStyle: {
    marginVertical: 10,
  },
});

export default HomeScreen;
