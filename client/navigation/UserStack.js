import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabStack from './BottomTabStack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

function UserStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="SignupScreen"
            screenOptions={{
                headerShown: false
            }}
            >
            <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default UserStack;