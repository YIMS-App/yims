import { StatusBar } from 'expo-status-bar'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import AddMatch from '../components/leaderboard-screen/AddMatch'
import FirstPlaceStanding from '../components/leaderboard-screen/FirstPlaceStanding'
import NavBar from '../components/shared/NavBar'
import Standing from '../components/leaderboard-screen/Standing'
import React, { useState, useEffect } from 'react'
import UpdateMatch from '../components/leaderboard-screen/UpdateMatch'
import { IP_ADDRESS } from '../utils/constants.js'
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'

export default function LeaderboardScreen ({ params, navigation }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [addMatchIsVisible, setAddMatchIsVisible] = useState(false)
  const [updateMatchIsVisibile, setUpdateMatchIsVisibile] = useState(false)
  const [addButtonVisible, setaddButtonVisible] = useState(false)
  const [tab, setTab] = useState('points')
  const [updateVisibility, setUpdateVisibility] = useState(false)

  const fetchData = async () => {
    const resp = await fetch(IP_ADDRESS + '/totalscores')
    const colleges = await resp.json()
    setData(colleges.scores)
    setLoading(false)
  }

  useEffect(() => {
    // runs once to update data at the first render
    fetchData()
    checkUserPerm()
  }, [])

  function checkUserPerm () {
    if (params.role === 'admin') {
      setaddButtonVisible(true)
    } else {
      setaddButtonVisible(false)
    }
  }

  function startUpdateMatchHandler () {
    setUpdateMatchIsVisibile(true)
  }
  function endUpdateMatchHandler () {
    fetchData() // to make sure the points values are updated upon points being added
    setUpdateMatchIsVisibile(false)
  }

  function startaddMatchHandler () {
    setAddMatchIsVisible(true)
  }
  function endaddMatchHandler () {
    fetchData() // to make sure the points values are updated upon points being added
    setAddMatchIsVisible(false)
  }

  function handleUpdateVisibility (visible) {
    setUpdateVisibility(visible)
    setaddButtonVisible(!visible)
  }

  const addMatchHandler = async (college1, college2, sport, startTime, endTime, winner, location, score1, score2) => {
    try {
      await fetch(IP_ADDRESS + '/updatematch', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          college1,
          college2,
          sport,
          winner,
          startTime,
          endTime,
          location,
          summary: '',
          score1,
          score2
        })
      })
    } catch (e) {
      console.log(e)
    }
    endaddMatchHandler()
    endUpdateMatchHandler()
  }

  return loading
    ? (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator animating={true} color="#bc2b78" size="large" />
    </View>
      )
    : (
    <TouchableWithoutFeedback onPress={() => handleUpdateVisibility(false)} disabled={!updateVisibility}>
      <View image style={[styles.container, addMatchIsVisible ? { opacity: 0.5 } : {}]}>
        <StatusBar style="auto" />
        <LinearGradient style={styles.gradient} colors={['#3159C4', '#022277']}></LinearGradient>
        <View style={styles.headerContainer}>
          <NavBar navigation={navigation} title={'Leaderboard'} color={'white'} params={params} />
          <View style={styles.screenNavigator}>
            <TouchableOpacity
              style={[styles.navButton, tab === 'points' ? { backgroundColor: 'white' } : {}]}
              onPress={() => {
                setTab('points')
              }}
            >
              <Text style={[styles.navText, tab === 'points' ? { color: '#3159C4' } : { color: 'white' }]}>Points</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navButton, tab === 'participation' ? { backgroundColor: 'white' } : {}]}
              onPress={() => {
                setTab('participation')
              }}
            >
              <Text style={[styles.navText, tab === 'participation' ? { color: '#3159C4' } : { color: 'white' }]}>
                Participation
              </Text>
            </TouchableOpacity>
          </View>
          {tab === 'points' ? <FirstPlaceStanding firstPlace={data[0]} /> : <View style={{ marginTop: '50%' }}></View>}
        </View>
        {tab === 'points'
          ? (
          <View style={styles.leaderboardContainer}>
            <FlatList
              data={data.slice(1)}
              showsVerticalScrollIndicator={false}
              renderItem={(itemData) => {
                return <Standing collegeData={itemData} />
              }}
            />
          </View>
            )
          : (
          <View style={styles.participationContainer}>

          </View>
            )}
        {addButtonVisible
          ? (
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText} onPress={() => handleUpdateVisibility(true)}>
              +
            </Text>
          </TouchableOpacity>
            )
          : updateVisibility
            ? (
          <View style={styles.updateContainer} visible={false}>
            <TouchableOpacity style={styles.addMatchButton} onPress={startaddMatchHandler}>
              <Text style={styles.updateText}>Add Match</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateMatchButton} onPress={startUpdateMatchHandler}>
              <Text style={styles.updateText}>Score A Match</Text>
            </TouchableOpacity>
          </View>
              )
            : null}
        {addMatchIsVisible
          ? (
          <AddMatch onSubmitData={addMatchHandler} visible={addMatchIsVisible} onCancel={endaddMatchHandler} />
            )
          : null}
        {updateMatchIsVisibile
          ? (
          <UpdateMatch
            visible={updateMatchIsVisibile}
            onSubmitData={addMatchHandler}
            onCancel={endUpdateMatchHandler}
          />
            )
          : null}
      </View>
    </TouchableWithoutFeedback>
      )
}

LeaderboardScreen.propTypes = {
  navigation: PropTypes.object,
  params: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1
  },
  gradient: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    zIndex: 1
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30%',
    zIndex: 2
  },
  navText: {
    fontWeight: '700',
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  navButton: {
    borderRadius: 50,
    flex: 1,
    margin: 3,
    justifyContent: 'center'
  },
  screenNavigator: {
    borderColor: 'white',
    borderWidth: 2,
    width: 200,
    height: 35,
    marginTop: '15%',
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  leaderboardContainer: {
    backgroundColor: '#EEF1F6',
    flex: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    zIndex: 1,
    elevation: 1,
    paddingTop: '37%'
  },
  participationContainer: {
    backgroundColor: 'white',
    flex: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    zIndex: 1,
    elevation: 1,
    paddingTop: '37%'
  },
  updateContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
    borderTopLeftRadius: 30,
    backgroundColor: '#3159C4'
  },
  updateButton: {
    height: 70,
    width: 70,
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 10,
    backgroundColor: '#3159C4',
    borderRadius: 90
  },
  updateButtonText: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  updateMatchButton: {
    width: 100,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    backgroundColor: '#3159C4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white'
  },
  addMatchButton: {
    width: 100,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#3159C4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white'
  },
  updateText: {
    padding: 5,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold'
  }
})
