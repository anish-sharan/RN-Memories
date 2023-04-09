import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Keyboard,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomHeading from "../components/CustomHeading";
import { ApiContext } from "../context/ApiContext";

export default function SignupScreen({ navigation }) {
  const { verifyEmail } = useContext(ApiContext);

  const [userData, setUserData] = useState({
    firstName: "anish",
    lastName: "sharan",
    email: "a@mail.com",
    password: "123456",
    secondPassword: "123456",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    secondPassword: "",
  });

  const handleChange = (name, value) => {
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  const errorHandler = (name, error) => {
    setError((prevState) => ({ ...prevState, [name]: error }));
  };
  const loginHandler = useCallback(async () => {
    Keyboard.dismiss();
    let validUser = true;
    // if (!userData.firstName) {
    //   errorHandler("name", "First Name required");
    //   validUser = false;
    // }
    // if (!userData.lastName) {
    //   errorHandler("name", "First Name required");
    //   validUser = false;
    // }
    // if (!userData.email) {
    //   errorHandler("email", "Email required");
    //   validUser = false;
    // }
    // if (!userData.password || !userData.secondPassword) {
    //   errorHandler("password", "Password required");
    //   validUser = false;
    // }
    // if (userData.password.length < 5) {
    //   errorHandler("password", "Password must be greater then 5 chars");
    //   validUser = false;
    // }
    // if (userData.secondPassword.length < 5) {
    //   errorHandler("password", "Password must be greater then 5 chars");
    //   validUser = false;
    // }
    // if (userData.password !== userData.secondPassword) {
    //   errorHandler("secondPassword", "Password did not matched");
    //   validUser = false;
    // }

    if (validUser) {
      let data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      };
      let dataToSend = {
        email: userData.email,
      };
      const response = await verifyEmail(dataToSend);

      if (!response.success) {
        Alert.alert("Something went wrong ", response.message);
      }
      navigation.navigate("OtpScreen", { data });
    }
  });
  return (
    <KeyboardAvoidingView style={styles.container}>
      <CustomHeading title={"Sign up"} />
      <CustomInput
        placeholder={"First Name"}
        onChangeText={(val) => handleChange("firstName", val)}
        onFocus={() => errorHandler("firstName", null)}
        value={userData.firstName}
        errorMessage={error.firstName}
      />
      <CustomInput
        placeholder={"Last Name"}
        onChangeText={(val) => handleChange("lastName", val)}
        onFocus={() => errorHandler("lastName", null)}
        value={userData.lastName}
        errorMessage={error.lastName}
      />
      <CustomInput
        placeholder={"Email"}
        onChangeText={(val) => handleChange("email", val)}
        onFocus={() => errorHandler("email", null)}
        value={userData.email}
        errorMessage={error.email}
      />
      <CustomInput
        placeholder={"Password"}
        onChangeText={(val) => handleChange("password", val)}
        onFocus={() => errorHandler("password", null)}
        value={userData.password}
        errorMessage={error.password}
        returnKeyType="go"
      />
      <CustomInput
        placeholder={"Repeat Password"}
        onChangeText={(val) => handleChange("secondPassword", val)}
        onFocus={() => errorHandler("secondPassword", null)}
        value={userData.secondPassword}
        errorMessage={error.password}
      />
      <CustomButton title={"press me"} onPress={loginHandler} />
      <Text>
        already have an account?
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          {" "}
          Log In
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    top: "20%",
    flexDirection: "column",
    alignSelf: "center",
  },
});
