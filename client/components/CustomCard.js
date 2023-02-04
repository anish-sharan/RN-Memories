import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const CustomCard = ({ style, title, description }) => {
  return (
    <View style={[styles.container, style]}>
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
          <Text variant="bodyMedium">{description}</Text>
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
