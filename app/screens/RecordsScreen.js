import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState, useEffect, React } from 'react'
import NavBar from '../components/shared/NavBar'
import Flag from '../components/shared/Flag'
import ModalDropdown from '../components/shared/ModalDropdown'
import { COLLEGES, IP_ADDRESS } from '../utils/constants'
import PropTypes from 'prop-types'

export default function RecordsScreen ({ navigation, params }) {
  const [matches, setMatches] = useState([])
  const [filterMatches, setfilterMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterText, setFilterText] = useState('All Colleges')
  const [scores, setScores] = useState([])
  const [points, setPoints] = useState(0)
  const [sports, setSports] = useState({})
  const collegeOptions = ['All Colleges'].concat(COLLEGES)

  function startIndividualMatch (data) {
    navigation.navigate('IndividualMatch', { data, params })
  }

  const fetchMatchesScores = async () => {
    Promise.all([
      fetch(IP_ADDRESS + '/getpastmatches'),
      fetch(IP_ADDRESS + '/totalscores'),
      fetch(IP_ADDRESS + '/getallsportscores')
    ])
      .then(([resMatches, resScores, resSports]) =>
        Promise.all([resMatches.json(), resScores.json(), resSports.json()])
      )
      .then(([matchesData, scoresData, sportsData]) => {
        setMatches(matchesData.matches)
        setfilterMatches(matchesData.matches)
        setScores(scoresData.scores)
        setSports(sportsData)
        setLoading(false)
      })
  }

  useEffect(() => {
    // runs once to update data at the first render
    fetchMatchesScores()
  }, [])

  const setData = (college) => {
    setFilterText(college)
    if (college !== 'All Colleges') {
      setfilterMatches(matches.filter((match) => match.college1 === college || match.college2 === college))
      setPoints(scores.filter((score) => college === score.college)[0].score)
    } else {
      setfilterMatches(matches)
    }
  }

  return (
    <View style={styles.container}>
      {loading
        ? (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <NavBar navigation={navigation} title={'Records'} color={'#3159C4'} params={params} />
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
            <ActivityIndicator animating={true} color="#bc2b78" size="large" />
          </View>
        </View>
          )
        : (
        <View>
          <NavBar navigation={navigation} title={'Records'} color={'#3159C4'} params={params} />
          <View style={styles.headerContainer}>
            <ModalDropdown
              filterText={filterText}
              dropdownTextStyle={styles.dropdownTextStyle}
              dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
              dropdownStyle={styles.dropdownStyle}
              dropdownHighlightStyle={styles.dropdownHighlightStyle}
              modalStyle={styles.modalStyle}
              filterButtonStyle={styles.filterButton}
              filterTextStyle={styles.filterText}
              setData={setData}
              options={collegeOptions}
            />
            {filterText !== 'All Colleges'
              ? (
              <View style={styles.summarycontainer}>
                <View style={styles.pointscontainer}>
                  <Text style={styles.points}>{points} </Text>
                  <Text style={styles.gamepoints}>game</Text>
                  <Text style={styles.gamepoints}>points</Text>
                </View>
                <Flag college={filterText} />
              </View>
                )
              : (
              <View style={styles.emptySpace}></View>
                )}
          </View>
          <View style={styles.matchesContainer}>
            <Text style={styles.year}>2022</Text>
            {filterText === 'All Colleges'
              ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderTopColor: 'white',
                  borderTopWidth: 1,
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                  marginTop: 10
                }}
              >
                <Text style={styles.tableHeader}>Date</Text>
                <Text style={styles.tableHeader}>Winner</Text>
                <Text style={styles.tableHeader}>Loser</Text>
                <Text style={styles.tableHeader}>Sport</Text>
              </View>
                )
              : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderTopColor: 'white',
                  borderTopWidth: 1,
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                  marginTop: 10
                }}
              >
                <Text style={styles.collegeTableHeader}>Date</Text>
                <Text style={styles.collegeTableHeader}>Points</Text>
                <Text style={styles.collegeTableHeader}>Opponent</Text>
                <Text style={styles.collegeTableHeader}>W/L/T</Text>
                <Text style={styles.collegeTableHeader}>Sport</Text>
              </View>
                )}
            <FlatList
              data={filterMatches}
              showsVerticalScrollIndicator={false}
              renderItem={(itemData) => {
                return filterText === 'All Colleges'
                  ? (
                  <TouchableOpacity onPress={() => startIndividualMatch(itemData.item)}>
                    <View style={{ flexDirection: 'row', padding: 3 }}>
                      <Text style={styles.matchDate}>
                        {itemData.item.startTime.slice(5, 7) + '/' + itemData.item.startTime.slice(8, 10)}
                      </Text>
                      <Text style={[styles.matchWinner, itemData.item.winner === 'TIE' ? { color: 'yellow' } : {}]}>
                        {itemData.item.college1 === itemData.item.winner
                          ? itemData.item.college1Abbrev
                          : itemData.item.college2 === itemData.item.winner
                            ? itemData.item.college2Abbrev
                            : itemData.item.college1Abbrev + '(T)'}
                      </Text>
                      <Text style={[styles.matchLoser, itemData.item.winner === 'TIE' ? { color: 'yellow' } : {}]}>
                        {itemData.item.college1 === itemData.item.winner
                          ? itemData.item.college2Abbrev
                          : itemData.item.college2 === itemData.item.winner
                            ? itemData.item.college1Abbrev
                            : itemData.item.college2Abbrev + '(T)'}
                      </Text>
                      <Text style={styles.matchSport}>{sports[itemData.item.sport][1]}</Text>
                    </View>
                  </TouchableOpacity>
                    )
                  : (
                  <TouchableOpacity onPress={() => startIndividualMatch(itemData.item)}>
                    <View style={{ flexDirection: 'row', padding: 3 }}>
                      <Text style={styles.collegeMatchDate}>
                        {itemData.item.startTime.slice(5, 7) + '/' + itemData.item.startTime.slice(8, 10)}
                      </Text>
                      <Text
                        style={[
                          styles.matchPts,
                          {
                            color:
                              itemData.item.winner === filterText
                                ? '#1FED27'
                                : itemData.item.winner === 'TIE'
                                  ? '#FFCA28'
                                  : '#FF5353'
                          }
                        ]}
                      >
                        +{' '}
                        {itemData.item.winner === filterText
                          ? sports[itemData.item.sport][0]
                          : itemData.item.winner === 'TIE'
                            ? sports[itemData.item.sport][0] / 2
                            : 0}
                        pts
                      </Text>
                      <Text style={styles.matchOpponent}>
                        {itemData.item.college1 === filterText
                          ? itemData.item.college2Abbrev
                          : itemData.item.college1Abbrev}
                      </Text>
                      <Text style={styles.matchOutcome}>
                        {itemData.item.winner === filterText ? 'W' : itemData.item.winner === 'TIE' ? 'T' : 'L'}
                      </Text>
                      <Text style={styles.collegeMatchSport}>{sports[itemData.item.sport][1]}</Text>
                    </View>
                  </TouchableOpacity>
                    )
              }}
            />
          </View>
        </View>
          )}
    </View>
  )
}

RecordsScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  params: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  matchesContainer: {
    backgroundColor: '#3159C4'
  },
  emptySpace: {
    padding: 10
  },
  headerContainer: {
    backgroundColor: 'white',
    marginTop: 60
  },
  filterButton: {
    backgroundColor: '#DFE5F2',
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 30,
    marginRight: 30,
    height: 50
  },
  filterText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#3159C4',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  dropdownTextStyle: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'Normal',
    color: '#3159C4'
  },
  dropdownTextHighlightStyle: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'Normal',
    color: '#DFE5F2',
    backgroundColor: '#3159C4'
  },
  dropdownStyle: {
    alignItems: 'center',
    backgroundColor: '#DFE5F2',
    borderRadius: 20
  },
  dropdownHighlightStyle: {
    alignItems: 'center',
    backgroundColor: '#3159C4',
    borderRadius: 20
  },
  modalStyle: {
    paddingHorizontal: 20,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#DFE5F2',
    borderRadius: 20,
    marginTop: 155
  },
  year: {
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
    marginLeft: 20,
    marginTop: 10
  },
  points: {
    fontSize: 65,
    fontWeight: '700',
    color: '#3159C4',
    paddingLeft: 10
  },
  gamepoints: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3159C4'
  },
  pointscontainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  summarycontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  tableHeader: {
    fontSize: 25,
    color: 'white',
    paddingVertical: 3
  },
  matchDate: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 25,
    width: 60,
    fontSize: 20
  },
  matchWinner: {
    marginLeft: 40,
    width: 60,
    fontWeight: '700',
    color: '#1FED27',
    fontSize: 20
  },
  matchLoser: {
    marginLeft: 40,
    width: 60,
    fontWeight: '700',
    color: '#FF5353',
    fontSize: 20
  },
  matchSport: {
    marginLeft: 40,
    width: 45,
    fontWeight: '700',
    fontSize: 20
  },
  collegeTableHeader: {
    fontSize: 20,
    color: 'white',
    paddingVertical: 3
  },
  collegeMatchDate: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    marginLeft: 13
  },
  matchPts: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    marginLeft: 13
  },
  matchOpponent: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    width: 30,
    marginLeft: 55
  },
  matchOutcome: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    width: 20,
    marginLeft: 60
  },
  collegeMatchSport: {
    marginLeft: 45,
    width: 25,
    fontWeight: '700',
    fontSize: 15,
    color: 'white'
  }
})
