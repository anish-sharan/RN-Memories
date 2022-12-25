import React from 'react';
import { TextInput } from 'react-native-paper';
import Colors from '../assets/Colors';
import { StyleSheet } from 'react-native';

const CustomInput = ({ style, ref, onSubmitEditing, placeholder, onChangeText, value, errorMessage, onFocus, multiline = false }) => {
  return (
    <TextInput
      style={[styles.container, style]}
      ref={ref}
      multiline={multiline}
      onSubmitEditing={onSubmitEditing}
      label={errorMessage ? errorMessage : placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      mode="outlined"
      placeholderTextColor={'red'}
      theme={{
        colors: errorMessage ? { primary: Colors.red, background: Colors.white, text: 'yellow' } : { primary: Colors.color4, background: Colors.white, text: 'green' },
        roundness: 8
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5
  }
})

export default CustomInput;