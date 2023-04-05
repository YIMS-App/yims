import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import UserQRCodeScreen from "./screens/UserQRCodeScreen";
import * as Linking from 'expo-linking';
import ProfileScreen from "./screens/ProfileScreen";

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      Login: 'login',
      Home: {
        screens: {
          Leaderboard: 'leaderboard',
          Records: 'records',
          UpcomingMatches: 'upcomingmatches',
          HowToPlay: 'howtoplay',
          About: 'about',
          Calendar: 'calendar',
        },
      },
      UserQRCode: 'userqrcode',

    },
  },
};

export default function App() {
  const url = Linking.useURL();
  Linking.openURL(url)
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserQRCode" component={UserQRCodeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
