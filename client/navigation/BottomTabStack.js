import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/BottomScreens/HomeScreen';
import FavouriteScreen from '../screens/BottomScreens/FavouriteScreen';
import SearchScreen from '../screens/BottomScreens/SearchScreen';
import ProfileScreen from '../screens/BottomScreens/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../assets/Colors';

const Tab = createBottomTabNavigator();

function BottomTabStack() {
  return (
    <Tab.Navigator
      >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor:  Colors.black,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="home" color={Colors.dark} size={25} />
          )
        }} />
      <Tab.Screen name="FavouriteScreen" component={FavouriteScreen}
        options={{
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="heart" color={Colors.dark} size={25} />
          )
        }}
      />
      <Tab.Screen name="SearchScreen" component={SearchScreen}
        options={{
          tabBarActiveTintColor: Colors.dark,
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => (
            <Ionicons name="search" color={Colors.dark} size={25} />
          )
        }}
      />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="person" color={Colors.dark} size={25} />
          )
        }} />
    </Tab.Navigator >
  );
}

export default BottomTabStack;