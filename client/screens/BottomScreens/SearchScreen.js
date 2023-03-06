import React, { useState, useContext } from "react";
import { StyleSheet, View, Keyboard, Alert } from "react-native";
import { Searchbar } from "react-native-paper";
import { ApiContext } from "../../context/ApiContext";
import MemoryList from "../../components/MemoryList";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const { searchMemory } = useContext(ApiContext);

  const onChangeSearch = (query) => setSearchQuery(query);

  const searchHandler = async () => {
    Keyboard.dismiss();
    const response = await searchMemory(searchQuery);
    if (!response.success) {
      Alert.alert("Something went wrong");
    } else {
      setDataToDisplay(response.data);
    }
  };
  
  return (
    <>
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          onIconPress={searchHandler}
        />
      </View>
      <MemoryList memoryToDisplay={dataToDisplay} addRefreshControl={false} />
    </>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    padding: 5,
  },
  searchBar: {
    flex: 1,
  },
});

export default SearchScreen;
