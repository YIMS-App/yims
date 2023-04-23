import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import MainScreen from './LeaderboardScreen'
import RecordsScreen from './RecordsScreen'
import AboutScreen from './AboutScreen'
import UpcomingMatchesScreen from './UpcomingMatchesScreen'
import HowToPlayScreen from './HowToPlayScreen'
import CalendarScreen from './CalendarScreen'
import PropTypes from 'prop-types'
import { IP_ADDRESS } from '../utils/constants'

export default function HomeScreen ({ route }) {
  const Drawer = createDrawerNavigator()
  const navBarVersion = route.params.version
  
  const updateViewMetric = async (version) => {
    try {
      await fetch(IP_ADDRESS + '/incrementviews', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          buttonColor: version
        })
      }).then((responseData) => {})
    } catch (e) {
      console.log(e)
    }
  };

  updateViewMetric(navBarVersion)
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: styles.drawerLabel,
        drawerStyle: { backgroundColor: '#EEF1F6' }
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="Leaderboard">{(values) => <MainScreen {...values} params={route.params} />}</Drawer.Screen>
      <Drawer.Screen name="Records">{(values) => <RecordsScreen {...values} params={route.params} />}</Drawer.Screen>
      <Drawer.Screen name="Upcoming Matches">
        {(values) => <UpcomingMatchesScreen {...values} params={route.params} />}
      </Drawer.Screen>
      <Drawer.Screen name="How To Play">
        {(values) => <HowToPlayScreen {...values} params={route.params} />}
      </Drawer.Screen>
      <Drawer.Screen name="About">{(values) => <AboutScreen {...values} params={route.params} />}</Drawer.Screen>
      <Drawer.Screen name="Calendar">{(values) => <CalendarScreen {...values} params={route.params}/>}</Drawer.Screen>
    </Drawer.Navigator>
  )
}

function CustomDrawerContent (props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Yale IMs" labelStyle={styles.headerText} style={styles.headerContainer} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

HomeScreen.propTypes = {
  route: PropTypes.object
}

const styles = StyleSheet.create({
  headerText: {
    color: '#3159C4',
    fontWeight: '700',
    fontSize: 20
  },
  headerContainer: {
    borderBottomColor: '#3159C4',
    borderBottomWidth: 2
  },
  drawerLabel: {
    color: '#3159C4',
    fontWeight: '700',
    fontSize: 20
  }
})
