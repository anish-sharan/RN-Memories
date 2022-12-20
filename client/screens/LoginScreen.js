import React, { useState, useContext, useCallback } from 'react'
import { View, Keyboard, StyleSheet, Text, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { ApiContext } from '../context/ApiContext';

export default function LoginScreen({ navigation }) {
    const { signIn } = useContext(ApiContext);

    const [userData, setUserData] = useState({
        email: 'anish@mail.com',
        password: '123456'
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

    const loginHandler = useCallback(async () => {
        Keyboard.dismiss();
        let validUser = true;
        if (!userData.email) {
            errorHandler('email', 'Email required');
            validUser = false;
        }
        if (!userData.password) {
            errorHandler('password', 'Password required');
            validUser = false;
        }

        if (validUser) {
            const response = await signIn(userData);
            if (!response.response.success) {
                Alert.alert('Something went wrong',response.response.message);
            }
        }
    })


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
            <Text>Don't have an account?
            <Text style={{ color: 'blue' }}
                    onPress={() => navigation.navigate('SignupScreen')}>
                    {' '}Sign Up
            </Text>
            </Text>
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