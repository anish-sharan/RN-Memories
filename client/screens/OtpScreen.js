import { StyleSheet, Text, Alert, View } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomHeading from "../components/CustomHeading";
import CustomButton from "../components/CustomButton";
import React, { useState, useContext } from "react";
import { formatOtp } from "../utils/utils";
import { ApiContext } from "../context/ApiContext";

const OtpScreen = ({ route, navigation }) => {
  const { signUp, verifyOtp } = useContext(ApiContext);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const userData = route.params.data;

  const signInHandler = async () => {
    console.log("sign in clicked");
    if (!otp) {
      setOtpError("Otp required");
    } else if (otp.length < 6) {
      setOtpError("Otp must be 6 digit");
    }
    const response = await verifyOtp(userData, otp);

    if (!response.success) {
      Alert.alert("Otp did not matched", response.message);
    } else {
      //   navigation.navigate("UnknownUserStack", { screen: "LoginScreen" });
      navigation.navigate("LoginScreen");
    }
  };

  //   console.log(route.params);

  return (
    <View style={styles.container}>
      <CustomHeading title={"Otp screen"} />
      <CustomInput
        placeholder={"Otp received in mail"}
        onChangeText={(val) => {
          const newOtp = formatOtp(val);
          setOtp(newOtp);
        }}
        onFocus={() => setOtpError(null)}
        value={otp}
        errorMessage={otpError}
        style={styles.inputStyle}
        maxLength={6}
      />
      <CustomButton
        title={"Sign in"}
        onPress={signInHandler}
        style={styles.inputStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "40%",
  },
  inputStyle: {
    width: "90%",
    alignSelf: "center",
  },
});

export default OtpScreen;
