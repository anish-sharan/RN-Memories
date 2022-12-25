import React from 'react'
import { View, StyleSheet } from 'react-native';
import CustomCard from '../../components/CustomCard';

const HomeScreen = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            {/* <CustomCard /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%'
    },
    searchBar: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20
    }
})

export default HomeScreen;
