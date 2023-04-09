import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../assets/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { ApiContext } from "../context/ApiContext";

import { Card, Text } from "react-native-paper";

const UploadImageComponent = ({ style, image, setImage }) => {
  const { uploadImageToDb } = useContext(ApiContext);
  const pickImage = async () => {
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {image ? (
        <View style={[styles.container, style]}>
          <Card.Cover
            source={{
              uri: image.uri,
            }}
          />
        </View>
      ) : (
        <View style={[styles.container, style]}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons
              name="add-circle"
              color={Colors.dark}
              size={50}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.color2,
    height: 150,
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
  },
  icon: {
    justifyContent: "center",
    alignSelf: "center",
  },
});
export default UploadImageComponent;
