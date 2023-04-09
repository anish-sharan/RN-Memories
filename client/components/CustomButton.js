import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../assets/Colors';

const CustomButton = ({ style, title, onPress, textStyle }) => {
    return (
        <>
            <TouchableOpacity style={[styles.container, style]}
                onPress={onPress}
                color={Colors.dark}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: Colors.dark,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Colors.white
    }
})

export default CustomButton;
