import React, { useState, useCallback, useContext } from 'react'
import { Keyboard, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import UploadImageComponent from '../../components/UploadImageComponent';
import { ApiContext } from '../../context/ApiContext';

const AddMemoryScreen = () => {
    const { addMemory } = useContext(ApiContext);

    const [memoryData, setMemoryData] = useState({
        title: '',
        description: '',
        photo: '',
        date: ''
    })
    const [memoryDataError, setmemoryDataError] = useState({
        title: '',
        description: ''
    })

    const handleChange = (name, value) => {
        setMemoryData((prevState) => ({ ...prevState, [name]: value }));
    }
    const errorHandler = (name, error) => {
        setmemoryDataError((prevState) => ({ ...prevState, [name]: error }));
    }

    const addHandler = useCallback(async () => {
        Keyboard.dismiss();
        let validInput = true;
        if (!memoryData.title) {
            errorHandler('title', 'Title required');
            validInput = false;
        }
        if (!memoryData.description) {
            errorHandler('description', 'Description required');
            validInput = false;
        }

        if (validInput) {
            let saveTimeAndDate = new Date();
            memoryData.date = saveTimeAndDate.toString();
            const response = await addMemory(memoryData);
            if (response.success) {
                Alert.alert('Data added successfully');
            } else {
                Alert.alert('Something went wrong');
            }
        }
    })

    return (
        <>
            <UploadImageComponent />
            <CustomInput
                placeholder='Title'
                onChangeText={(val) => handleChange('title', val)}
                onFocus={() => errorHandler('title', null)}
                style={styles.input}
                errorMessage={memoryDataError.title}
            />
            <CustomInput
                placeholder='Description'
                multiline={true}
                onChangeText={(val) => handleChange('description', val)}
                onFocus={() => errorHandler('description', null)}
                multiline={true}
                style={styles.input}
                errorMessage={memoryDataError.description}
            />
            <CustomButton title="Add" onPress={addHandler} style={{ width: '90%', alignSelf: 'center' }} />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        alignSelf: 'center'
    }
});
export default AddMemoryScreen;
