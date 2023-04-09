import React, { useState, useCallback, useContext } from "react";
import { Keyboard, StyleSheet, Alert, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import UploadImageComponent from "../../components/UploadImageComponent";
import { ApiContext } from "../../context/ApiContext";
import { UserContext } from "../../context/UserContext";

const AddMemoryScreen = () => {
  const { uploadImageToDb } = useContext(ApiContext);
  const { userContext } = useContext(UserContext);

  const userID = userContext?.userData?.userId;
  const [image, setImage] = useState(null);
  const [memoryData, setMemoryData] = useState({
    title: "",
    description: "",
  });
  const [memoryDataError, setmemoryDataError] = useState({
    title: "",
    description: "",
  });

  const handleChange = (name, value) => {
    setMemoryData((prevState) => ({ ...prevState, [name]: value }));
  };
  const errorHandler = (name, error) => {
    setmemoryDataError((prevState) => ({ ...prevState, [name]: error }));
  };

  const addHandler = useCallback(async () => {
    Keyboard.dismiss();
    let validInput = true;
    if (!memoryData.title) {
      errorHandler("title", "Title required");
      validInput = false;
    }
    if (!memoryData.description) {
      errorHandler("description", "Description required");
      validInput = false;
    }

    if (validInput) {
      const imageToSend = {
        file: `data:image/png;base64,${image.base64}`,
        upload_preset: process.env.UPLOAD_PRESET,
      };
      const dataToSend = {
        title: memoryData?.title,
        description: memoryData?.description,
      };
      const res = await uploadImageToDb(imageToSend, userID, dataToSend);
      if (res?.success) {
        Alert.alert("Memory add successfully");
      } else {
        Alert.alert("Something went wrong");
      }
    }
  });

  return (
    <>
      <UploadImageComponent
        style={{ marginVertical: "8%" }}
        image={image}
        setImage={setImage}
      />
      <CustomInput
        placeholder="Title"
        onChangeText={(val) => handleChange("title", val)}
        onFocus={() => errorHandler("title", null)}
        style={styles.input}
        errorMessage={memoryDataError.title}
      />
      <CustomInput
        placeholder="Description"
        multiline={true}
        onChangeText={(val) => handleChange("description", val)}
        onFocus={() => errorHandler("description", null)}
        style={styles.input}
        errorMessage={memoryDataError.description}
      />
      <CustomButton
        title="Add"
        onPress={addHandler}
        style={{ width: "90%", alignSelf: "center" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    alignSelf: "center",
    marginTop: "2%",
  },
});
export default AddMemoryScreen;
