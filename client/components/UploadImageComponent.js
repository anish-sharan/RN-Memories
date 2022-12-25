import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const UploadImageComponent = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity>
                <Ionicons name="add-circle" color={Colors.dark} size={50} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color2,
        height: 150,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10
    },
    icon: {
        justifyContent: 'center',
        alignSelf: 'center'
    }
})
export default UploadImageComponent;
