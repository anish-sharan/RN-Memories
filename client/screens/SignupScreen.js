import React, { useState, useCallback, useContext } from 'react'
import { View, Keyboard, StyleSheet, Alert, Text } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomHeading from '../components/CustomHeading';
import { ApiContext } from '../context/ApiContext';

export default function SignupScreen({ navigation }) {
    const { signUp } = useContext(ApiContext);

    const [userData, setUserData] = useState({
        name: 'anish sharan',
        email: 'anish@mail.com',
        password: '123456',
        secondPassword: '123456'
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        secondPassword: ''
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
        if (!userData.name) {
            errorHandler('name', 'Name required');
            validUser = false;
        }
        if (!userData.email) {
            errorHandler('email', 'Email required');
            validUser = false;
        }
        if (!userData.password) {
            errorHandler('password', 'Password required');
            validUser = false;
        }
        if (!userData.secondPassword) {
            errorHandler('password', 'Password required');
            validUser = false;
        }
        if (userData.password !== userData.secondPassword) {
            errorHandler('secondPassword', 'Password did not matched');
            validUser = false;
        }

        if (validUser) {
            let data = {
                firstName: userData.name,
                email: userData.email,
                password: userData.password
            }
            const response = await signUp(data);
            if (!response.success) {
                Alert.alert('Something went wrong ', response.message);
            }

        }
    })
    return (
        <View style={styles.container}>
            <CustomHeading title={'Sign up'} />
            <CustomInput
                placeholder={'Name'}
                onChangeText={(val) => handleChange('name', val)}
                onFocus={() => errorHandler('name', null)}
                value={userData.name}
                errorMessage={error.name}
            />
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
            <CustomInput
                placeholder={'Repeat Password'}
                onChangeText={(val) => handleChange('secondPassword', val)}
                onFocus={() => errorHandler('secondPassword', null)}
                value={userData.secondPassword}
                errorMessage={error.secondPassword}
            />
            <CustomButton title={'press me'} onPress={loginHandler} />
            <Text>already have an account?
            <Text style={{ color: 'blue' }}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    {' '}Log In
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