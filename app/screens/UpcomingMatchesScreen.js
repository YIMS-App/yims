import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import NavBar from '../components/shared/NavBar';
import { COLLEGES, IP_ADDRESS } from '../utils/constants';
import { ModalDropdown } from '../components/shared/ModalDropdown';
import PropTypes from 'prop-types';
import OpenURLButton from '../components/shared/OpenURLButton';

export default function UpcomingMatchesScreen({ navigation, params }) {
  const [matches, setMatches] = useState([]);
  const [filterMatches, setfilterMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('All Colleges');
  const shuttleLink = 'https://sportsandrecreation.yale.edu/field-shuttle-bus-schedule';
  const [refreshing, setRefreshing] = useState(false);
  const [sports, setSports] = useState({});
  const collegeOptions = ['All Colleges'].concat(COLLEGES);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMatchesScores();
  }, []);

  const fetchMatchesScores = async () => {
    Promise.all([fetch(IP_ADDRESS + '/getfuturematches'), fetch(IP_ADDRESS + '/getallsportscores')])
      .then(([resMatches, resSports]) => Promise.all([resMatches.json(), resSports.json()]))
      .then(([matchesData, sportsData]) => {
        setMatches(matchesData.matches);
        setfilterMatches(matchesData.matches);
        setSports(sportsData);
        setLoading(false);
      });
    setRefreshing(false);
  };

  const setData = (college) => {
    setFilterText(college);
    if (college !== 'All Colleges') {
      setfilterMatches(matches.filter((match) => match.college1 === college || match.college2 === college));
    } else {
      setfilterMatches(matches);
    }
  };

  useEffect(() => {
    // runs once to update data at the first render
    fetchMatchesScores();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
          <NavBar navigation={navigation} title={'Upcoming Matches'} color={'#3159C4'} params={params} />
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
            <ActivityIndicator animating={true} color="#bc2b78" size="large" />
          </View>
        </View>
      ) : (
        <View>
          <NavBar navigation={navigation} title={'Upcoming Matches'} color={'#3159C4'} params={params} />
          <View style={styles.headerContainer}>
            <ModalDropdown
              filterText={filterText}
              dropdownTextStyle={styles.dropdownTextStyle}
              dropdownStyle={styles.dropdownStyle}
              modalStyle={styles.modalStyle}
              filterButtonStyle={styles.filterButton}
              filterTextStyle={styles.filterText}
              setData={setData}
              options={collegeOptions}
            />
          </View>
          <OpenURLButton url={shuttleLink} buttonStyle={styles.shuttleButton}>
            <Text style={styles.shuttleText}>Shuttle Schedule</Text>
          </OpenURLButton>
          <View style={styles.matchesContainer}>
            <Text style={styles.year}>2022</Text>
            <FlatList
              refreshControl={
                <RefreshControl colors={['#9Bd35A', '#689F38']} refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={filterMatches}
              showsVerticalScrollIndicator={false}
              renderItem={(itemData) => {
                const startDateData = itemData.item.startTime;
                let startDate = startDateData.replace(/[-]/g, '/');
                // parse the proper date string from the formatted string.
                startDate = Date.parse(startDate);
                // create new date
                const startDateObj = new Date(startDate);

                const endDateData = itemData.item.endTime;
                let endDate = endDateData.replace(/[-]/g, '/');
                endDate = Date.parse(endDate);
                const endDateObj = new Date(endDate);

                const startDateString = startDateObj.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                });
                const endDateString = endDateObj.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                });

                return (
                  <TouchableOpacity
                    onPress={() => {
                      const data = itemData.item;
                      navigation.navigate('IndividualMatch', { data, params });
                    }}
                  >
                    <View style={styles.futureMatchContainer}>
                      <Text style={styles.futureMatchDate}>{itemData.item.startTime.slice(5, 10)}: </Text>
                      <Text style={styles.futureMatch}>
                        {itemData.item.college1Abbrev} vs. {itemData.item.college2Abbrev} @ {startDateString} -{' '}
                        {endDateString}{' '}
                      </Text>
                      <Text>{sports[itemData.item.sport][1]}</Text>
                    </View>
                    <View style={{ height: 7 }}></View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

UpcomingMatchesScreen.propTypes = {
  navigation: PropTypes.object,
  params: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  matchesContainer: {
    backgroundColor: '#D0D3DA',
    marginTop: 20,
  },
  emptySpace: {
    padding: 10,
  },
  headerContainer: {
    backgroundColor: 'white',
    marginTop: 60,
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
    height: 50,
  },
  filterText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#3159C4',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownTextStyle: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'Normal',
    color: '#3159C4',
  },
  dropdownStyle: {
    alignItems: 'center',
    backgroundColor: '#DFE5F2',
    borderRadius: 20,
  },
  shuttleButton: {
    backgroundColor: '#DFE5F2',
    borderRadius: 8,
    paddingHorizontal: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft: 100,
    marginRight: 100,
    height: 30,
  },
  shuttleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3159C4',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  year: {
    fontSize: 35,
    fontWeight: '700',
    color: '#3159C4',
    marginLeft: 20,
    marginTop: 10,
  },
  futureMatchContainer: {
    flexDirection: 'row',
    backgroundColor: '#DFE5F2',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  futureMatchDate: {
    color: '#3159C4',
    fontWeight: '700',
    fontSize: 16,
  },
  futureMatch: {
    color: '#3159C4',
    fontStyle: 'italic',
    fontSize: 16,
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
    marginTop: 175,
  },
  matchDropdown: {
    flexDirection: 'row',
    backgroundColor: '#3D6BE5',
    marginHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 7,
    padding: 10,
    alignItems: 'center',
  },
  addToCalButton: {
    backgroundColor: '#DFE5F2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    height: 30,
    marginLeft: 30,
  },
  addToCalText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3159C4',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  locationTitle: {
    fontSize: 16,
    color: 'white',
  },
});
