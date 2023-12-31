import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native'
import assets from '../assets'
import { IP_ADDRESS } from '../utils/constants.js'
import PropTypes from 'prop-types'

export default function UserQRCodeScreen ({ route, navigation }) {
  /* TODO: MUST ENSURE THAT USER IS LOGGED IN */
  // send user to login screen
  // get navigation and user's netid props

  // TODO: fetch user's college id using the abbreviation stored in their userData
  const collegeId = 2
  const [message, setMessage] = useState("Great Job! You've earned attendance points.")

  // const userProp = props.params.username;
  // const username = userProp.replace(/['"]+/g, '');

  useEffect(() => {
    // runs once to update data at the first render
    if (!route.params.username) { //   // send user to login screen and return here after ?
      console.log('have to login')
    }
    const matchId = route.params.matchId
    const netid = 'cmo48' // props["route"]["params"]["netid"];
    fetchUserInfo(netid, matchId)
  }, [])

  const fetchUserInfo = async (netid, matchid) => {
    try {
      await Promise.all([
        fetch(IP_ADDRESS + '/getuserdata', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            netid
          })
        }),
        fetch(IP_ADDRESS + '/getparticipationmatch', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            netid,
            matchid
          })
        })
      ])
        .then(([userInfo, participationStatus]) => Promise.all([userInfo.json(), participationStatus.json()]))
        .then(([userInfoData, participationStatusData]) => {
          // console.log("Data" + userInfoData)
          // setUserInfo(userInfoData);
          // console.log("Status" + participationStatusData)
          if (participationStatusData !== 2) {
            setMessage("Great Job! You've earned attendance points.")
            addParticipationPointsToCollege(collegeId, 17) // TODO: change number of points to be variable based on sport?
            addParticipationPointsToUser(netid, 17)
            updateMatchParticipation(netid, participationStatusData, matchid)
          } else {
            setMessage("You've already earned points for this game!")
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  const addParticipationPointsToCollege = async (collegeId, participationPoints) => {
    try {
      await fetch(IP_ADDRESS + '/addparticipationpointscollege', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: collegeId,
          part_score: participationPoints
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  const addParticipationPointsToUser = async (netid, participationPoints) => {
    try {
      await fetch(IP_ADDRESS + '/addparticipationpointsuser', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          netid,
          participationPoints
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  const updateMatchParticipation = async (netid, status, matchId) => {
    try {
      await fetch(IP_ADDRESS + '/updateparticipation', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          netid,
          status,
          matchid: matchId
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{message}</Text>
      <LottieView source={assets.lottieFiles.coin} autoPlay loop style={styles.animationContainer} />
      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.navigate('Leaderboard')}>
        <Text style={styles.blueText}>done</Text>
      </TouchableOpacity>
    </View>
  )
}

UserQRCodeScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D6BE5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  animationContainer: {
    width: 200,
    height: 200
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  blueText: {
    color: '#3D6BE5',
    fontSize: 20,
    textAlign: 'center'
  },
  doneButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12
  }
})
