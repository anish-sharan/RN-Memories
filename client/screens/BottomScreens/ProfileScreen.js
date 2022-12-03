import React from 'react'
import { Text,  StyleSheet } from 'react-native';
import FontSize from '../../assets/FontSize';

const ProfileScreen = () => {
    return (
        <Text style={[styles.container]}>ProfileScreen</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: FontSize.Heading,
        alignSelf: 'center',
        marginBottom: 10
    }   
})

export default ProfileScreen;
