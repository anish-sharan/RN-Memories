import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import CustomCard from '../../components/CustomCard';
import { ApiContext } from '../../context/ApiContext';
import { MemoryContext } from '../../context/MemoryContext';

const HomeScreen = ({ style }) => {
    const { getMemory } = useContext(ApiContext);
    const [memoryData, setMemoryData] = useState();
    const { setMemoryContext, memoryContext } = useContext(MemoryContext);

    const getMemoryHandler = (async () => {
        const res = await getMemory();
        setMemoryData(res);
        // let arr = [];
        // arr=memoryData.memories;
        // console.log('()->', arr[0]);
    })
 
    useEffect(() => {
        getMemoryHandler();
    }, [])
    console.log('--', memoryContext);
    return (
        <View style={[styles.container, style]}>
            {/* {memoryData?.memories.map((item) => {
                return (
                    <>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>

                    </>
                );
            })} */}
            {/* <Text>{memoryData.memories[0].title}</Text>
            <Text>{memoryData.memories[0].description}</Text> */}

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
