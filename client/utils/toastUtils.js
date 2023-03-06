import Toast from "react-native-toast-message";

export const showToast = ({
  type = "success",
  heading,
  message,
  position = "top",
  duration = 4000,
  onShow,
  onHide,
  onPress,
}) => {
  Toast.show({
    type,
    text1: heading,
    text2: message,
    position,
    visibilityTime: duration,
    onShow,
    onHide,
    onPress,
  });
};
