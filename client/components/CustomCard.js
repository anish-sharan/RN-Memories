import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native';
import FontSize from '../assets/FontSize.js';
import Colors from '../assets/Colors.js';
import { Button } from 'react-native-paper'

const CustomCard = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.cardBackground}>
                <Button icon='camera' style={styles.icon}/>
                <Text style={styles.heading}>hekllo</Text>
                <Text style={styles.description}>description</Text>
                <Text style={styles.date}>description</Text>
            <Image source={require('../assets/favicon.png')} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: FontSize.Heading,
        alignSelf: 'center',
        width: '90%',
        height: '40%'
    },
    cardBackground: {
        backgroundColor: Colors.light,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        flex: 3,
        // flexDirection: 'row'
    },
    image: {
        backgroundColor: Colors.dark,
        borderRadius: 10,
        height: '100%',
        width: '30%',
        zIndex: 1,
        position: 'absolute'
    },
    heading: {
        marginLeft: '32%',
        fontSize: 22
    },
    description: {
        marginLeft: '32%',
        fontSize: 20
    },
    date: {
        marginLeft: '32%',
        fontSize: 15
    },
    icon: {
        marginLeft: '85%',
    }
})

export default CustomCard;
