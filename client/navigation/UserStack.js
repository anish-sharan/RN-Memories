import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabStack from './BottomTabStack';
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
        </Stack.Navigator>
    )
}

export default UserStack;