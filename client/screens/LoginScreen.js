import React, { useState, useRef } from 'react'
import { View, Button, Keyboard, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        email: '',
        password: ''
    })
    const handleChange = (name, value) => {
        setUserData((prevState) => ({ ...prevState, [name]: value }));
    }
    const errorHandler = (name, error) => {
        setError((prevState) => ({ ...prevState, [name]: error }));
    }
    const loginHandler = () => {
        // Keyboard.dismiss();
        // let validUser = true;
        // if (!userData.email) {
        //     errorHandler('email', 'Email required');
        //     validUser = false;
        // }
        // if (!userData.password) {
        //     errorHandler('password', 'Password required');
        //     validUser = false;
        // }

        // if (validUser) {
        //     console.log('userData : ', userData);
        //     navigation.navigate('SignupScreen');
        // }
        navigation.navigate('SignupScreen');
    }
    return (
        <View style={styles.container}>
            <CustomInput
                placeholder={'Email'}
                onChangeText={(val) => handleChange('email', val)}
                onFocus={() => errorHandler('email', null)}
                value={userData.email}
                errorMessage={error.email}
            />
            <CustomInput
                placeholder={'Password'}
                onChangeText={(val) => handleChange('password', val)}
                onFocus={() => errorHandler('password', null)}
                value={userData.password}
                errorMessage={error.password}
                returnKeyType='go'
            />
            <CustomButton title={'Log in'} onPress={loginHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        top: '20%',
        flexDirection: 'column',
        alignSelf: 'center'
    }
})