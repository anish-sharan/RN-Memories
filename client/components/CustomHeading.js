import React from 'react'
import { Text,  StyleSheet } from 'react-native';
import FontSize from '../assets/FontSize.js';

const CustomHeading = ({ style, title }) => {
    return (
        <Text style={[styles.container, style]}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: FontSize.Heading,
        alignSelf: 'center',
        marginBottom: 10
    }   
})

export default CustomHeading;
