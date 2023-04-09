import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext";
import { Card } from "react-native-paper";

const ProfileScreen = () => {
  const { userContext } = useContext(UserContext);
  const { firstName, email } = userContext?.userData;

  return (
    <>
      <Card style={styles.cardContainer}>
        <FontAwesome
          name="user-circle-o"
          size={100}
          color="black"
          //   style={{ position: "absolute", right: "40%" }}
          style={{ alignSelf: "center" }}
        />
        <View style={[styles.rowStyle, { marginTop: "20%" }]}>
          <Text style={styles.textInsideCard}>Name</Text>
          <Text style={styles.textStyle}>{firstName || "N/A"}</Text>
        </View>
        <View style={styles.rowStyle}>
          <AntDesign
            name="mail"
            size={24}
            color="black"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>{email || "N/A"}</Text>
        </View>
        <View style={styles.rowStyle}>
          <AntDesign
            name="phone"
            size={24}
            color="black"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>+1234567810</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.textInsideCard}>Gender</Text>
          <Text style={styles.textStyle}>Male</Text>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    alignSelf: "center",
    flex: 0.7,
    marginTop: "20%",
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconStyle: {
    padding: 20,
    width: "30%",
  },
  textStyle: {
    width: "70%",
    fontSize: 18,
    padding: 20,
  },
  textInsideCard: { padding: 20, width: "30%", fontSize: 18 },
});

export default ProfileScreen;
