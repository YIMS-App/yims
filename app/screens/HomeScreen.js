import { StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import MainScreen from "./LeaderboardScreen";
import RecordsScreen from "./RecordsScreen";
import AboutScreen from "./AboutScreen";
import UpcomingMatchesScreen from "./UpcomingMatchesScreen";
import HowToPlay from "./HowToPlay"
import Calendar from "./Calendar"

export default function HomeScreen(props) {
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: styles.drawerLabel,
          drawerStyle: {backgroundColor: '#EEF1F6'},
        }}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen name="Leaderboard">{values => <MainScreen {...values} extraData={props["route"]["params"]} />}</Drawer.Screen>
        <Drawer.Screen name="Records">{values => <RecordsScreen {...values} extraData={props["route"]["params"]} />}</Drawer.Screen>
        <Drawer.Screen name="Upcoming Matches" component={UpcomingMatchesScreen} />
        <Drawer.Screen name="How To Play" component={HowToPlay} /> 
        <Drawer.Screen name="About" component={AboutScreen} /> 
        <Drawer.Screen name="Calendar" component={Calendar} />
      </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}
        >
            <DrawerItem
            label="Yale IMs"
            labelStyle={styles.headerText}
            style={styles.headerContainer}/>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    headerText: {
      color: '#3159C4',
      fontWeight: '700',
      fontSize: 20,
    },
    headerContainer: {
      borderBottomColor: '#3159C4',
      borderBottomWidth: 2,
    },
    drawerLabel: {
      color: '#3159C4',
      fontWeight: '700',
      fontSize: 20,
    }
});