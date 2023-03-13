import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../assets/Colors";

const CustomCard = ({
  style,
  title,
  description,
  onPressFavourite,
  isLiked = false,
  isHomeScreen = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Card.Content>
            <Text variant="titleLarge">{title}</Text>
          </Card.Content>
          <Card.Actions style={{ width: "20%" }}>
            {isLiked ? (
              <TouchableOpacity
                onPress={() => {
                  onPressFavourite && onPressFavourite();
                }}
              >
                <Ionicons name="heart" color={Colors.dark} size={25} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onPressFavourite && onPressFavourite();
                }}
              >
                <Ionicons name="heart-outline" color={Colors.dark} size={25} />
              </TouchableOpacity>
            )}
          </Card.Actions>
        </View>
        <Card.Content>
          <Text variant="titleMedium">{description}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "90%",
  },
});

export default CustomCard;
