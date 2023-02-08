import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/BottomScreens/HomeScreen";
import FavouriteScreen from "../screens/BottomScreens/FavouriteScreen";
import SearchScreen from "../screens/BottomScreens/SearchScreen";
import ProfileScreen from "../screens/BottomScreens/ProfileScreen";
import AddMemoryScreen from "../screens/BottomScreens/AddMemoryScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../assets/Colors";

const Tab = createBottomTabNavigator();

function BottomTabStack() {
  const headerColor = Colors.dark;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "My home",
          headerStyle: {
            backgroundColor: headerColor,
          },
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="home" color={Colors.dark} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          title: "Your Favourites",
          headerStyle: {
            backgroundColor: headerColor,
          },
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="heart" color={Colors.dark} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="AddMemoryScreen"
        component={AddMemoryScreen}
        options={{
          title: "Add memories",
          headerStyle: {
            backgroundColor: headerColor,
          },
          tabBarHideOnKeyboard: true,
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="add-circle" color={Colors.dark} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Search memory",
          headerStyle: {
            backgroundColor: headerColor,
          },
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.dark,
          tabBarHideOnKeyboard: true,
          tabBarIcon: () => (
            <Ionicons name="search" color={Colors.dark} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile screen",
          headerStyle: {
            backgroundColor: headerColor,
          },
          headerTintColor: Colors.white,
          tabBarActiveTintColor: Colors.dark,
          tabBarIcon: () => (
            <Ionicons name="person" color={Colors.dark} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabStack;
