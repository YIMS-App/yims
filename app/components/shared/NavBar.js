import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { React } from 'react'
import PropTypes from 'prop-types'

export default function NavBar ({ color, navigation, title, params }) {
  const navBarVersion = params.version
  const updateClickMetric = async (version) => {
    try {
      await fetch(IP_ADDRESS + '/incrementclick', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          version
        })
      }).then((responseData) => {console.log(responseData)})
    } catch (e) {
      console.log(e)
    }
  };

  if (color === 'white') {
    return (
      <View style={styles.navigationContainer} testID="navbar-view-white">
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.toggleDrawer()
          }}
        >
          <Image source={require('../../assets/images/menu-icon-white.png')} style={styles.image} />
        </TouchableOpacity>
        <Text style={[styles.title, { color }]} testID="navbar-title-white">
          {title}
        </Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => {
            navigation.navigate('Profile', params)
            updateClickMetric(navBarVersion)
          }}
        >
          <Image source={require('../../assets/images/profile-icon-white.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.navigationContainer} testID="navbar-view-blue">
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.toggleDrawer()
          }}
        >
          <Image source={require('../../assets/images/menu-icon-blue.png')} style={styles.image} />
        </TouchableOpacity>
        <Text style={[styles.title, { color }]} testID="navbar-title-blue">
          {title}
        </Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => {
            navigation.navigate('Profile', params)
            updateClickMetric(navBarVersion)
          }}
        >
          <Image source={require('../../assets/images/profile-icon-blue.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    )
  }
}

NavBar.propTypes = {
  navigation: PropTypes.object,
  params: PropTypes.object,
  color: PropTypes.string,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  navigationContainer: {
    top: '12%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 2,
    textAlign: 'center'
  },
  menuButton: {
    flex: 1
  },
  profileButton: {
    flex: 1,
    alignItems: 'flex-end'
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  }
})
