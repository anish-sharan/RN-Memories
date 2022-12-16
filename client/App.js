import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserStack from './navigation/UserStack';
import ApiContextProvider from './context/ApiContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApiContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UserStack" component={UserStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiContextProvider>
  );
}

export default App;