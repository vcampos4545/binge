import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { default as React } from "react";
import "react-native-url-polyfill/auto";
import Icon from "react-native-vector-icons/FontAwesome";
import useSession from "../hooks/useSession";
import Account from "../screens/Account";
import Auth from "../screens/Auth";
import Feed from "../screens/Feed";
import Lists from "../screens/Lists";
import Search from "../screens/Search";
import useProfile from "../hooks/useProfile";

const Tab = createBottomTabNavigator();

export default function Main() {
  const { user, session } = useSession();
  const { profile } = useProfile();
  return (
    <>
      {session && user ? (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              // headerTitleAlign: "right", // Aligns header title to the right
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              tabBarStyle: {
                height: 100,
                borderTopLeftRadius: 20, // Rounded corners on the left side
                borderTopRightRadius: 20, // Rounded corners on the right side
                borderTopWidth: 0,
              },
              tabBarLabelStyle: {
                fontSize: 12, // Font size of tab label
              },
              tabBarActiveTintColor: "#CC7F67", // Color of the tab when active
              tabBarInactiveTintColor: "#858585",
            }}
          >
            <Tab.Screen
              name="Feed"
              component={Feed}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Lists"
              component={Lists}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="bars" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="search" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name={profile?.username || "Profile"}
              component={Account}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="user" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </>
  );
}
