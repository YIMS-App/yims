import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Banner from '../components/individual-match-screen/Banner';
import Countdown from '../components/individual-match-screen/Countdown';
import MoreInfo from '../components/individual-match-screen/MoreInfo';
import PropTypes from 'prop-types';

function IndividualMatch({ route, navigation }) {
  const matchData = route.params.data;

  const today = new Date();
  const matchDate = new Date(matchData.startTime);

  const [bettingOver, setBettingOver] = useState(true);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    setBettingOver(matchDate < today);
  }, []);

  const onChanged1 = (text) => {
    let newText = '';
    const numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('Please enter numbers!');
      }
    }
    setScore1(newText);
  };

  const onChanged2 = (text) => {
    let newText = '';
    const numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('Please enter numbers!');
      }
    }
    setScore2(newText);
  };

  function setHeight(count, win, position) {
    if (position === 'left') {
      if (win) {
        return {
          height: count,
          width: 100,
          backgroundColor: '#1FED27',
          marginLeft: -20,
        };
      } else {
        return {
          height: count,
          width: 100,
          backgroundColor: '#1FED27',
          marginLeft: -20,
        };
      }
    } else {
      if (win) {
        return {
          height: count,
          width: 100,
          backgroundColor: 'green',
          marginLeft: 50,
        };
      } else {
        return {
          height: count,
          width: 100,
          backgroundColor: 'red',
          marginLeft: 50,
        };
      }
    }
  }

  function setCollegeText(count) {
    return {
      marginTop: count,
      textAlign: 'center',
      padding: 10,
      flexWrap: 'wrap',
    };
  }

  const emoji = { soccer: '⚽' }; // TODO fix

  const dummy = {
    score1: 1, // TODO: scores need to be added to the match object
    score2: 0,
    participants: ['AX', 'BX', 'CO'], // TODO: fetch participants of a certain match
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.image} source={require('../assets/images/blue-down-arrow.png')} />
      </TouchableOpacity>

      <Banner // TODO make this just a match object and do the date logic in the banner itself
        date={matchData.startTime}
        college1={matchData.college1}
        college2={matchData.college2}
        score1={today < matchData.startTime ? '' : dummy.score1}
        score2={today < matchData.startTime ? '-' : dummy.score2}
        sport={emoji[matchData.sport]}
      />

      <View style={styles.whitespace}></View>

      {/* MORE INFO + PARTICIPATION  */}
      <View style={styles.stretch}>
        <MoreInfo match={matchData} params={route.params.params} />
      </View>

      {/* BETTING */}
      <View style={styles.betting}>
        {!bettingOver ? (
          <View>
            <Text style={styles.bettingTitle}> Place Your Bet Now! </Text>
            <View style={styles.center}>
              <Countdown startTime={matchDate} />
              <View style={styles.survey}>
                <Text style={styles.winner}>Select Winner:</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.surveyButton}>
                    <Text style={styles.surveyButtonText}>{matchData.college1}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.surveyButton}>
                    <Text style={styles.surveyButtonText}>{matchData.college2}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.winner}>Select Final Score:</Text>

                <SafeAreaView style={styles.enterScore}>
                  <Text style={styles.winner}>Select Final Score:</Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) => onChanged1(text)}
                    value={score1}
                    style={styles.input}
                    placeholder="Winner"
                    maxLength={10}
                  />
                  <Text style={styles.dash}> - </Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={(text) => onChanged2(text)}
                    value={score2}
                    style={styles.input}
                    placeholder="Loser"
                    maxLength={10}
                  />
                </SafeAreaView>

                <Text style={styles.winner}>Select Bet:</Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.bettingTitle}> The Bets are In! </Text>

            <View style={styles.graph}>
              <View style={setHeight(200, true, 'left')}>
                <Text style={styles.barText}>200</Text>
                <Text style={setCollegeText(170)}>{matchData.college1}</Text>
              </View>
              <View style={setHeight(100, false, 'right')}>
                <Text style={styles.barText}>100</Text>
                <Text style={setCollegeText(70)}>{matchData.college2}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

IndividualMatch.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default IndividualMatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE5F2',
    alignItems: 'center',
    justifyContent: 'start',
  },
  whitespace: {
    height: 25,
  },
  stretch: {
    alignSelf: 'stretch',
  },
  betting: {
    marginTop: 50,
  },
  bettingTitle: {
    color: '#3D6BE5',
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  center: {
    marginRight: 25,
    marginTop: 5,
  },
  winner: {
    color: '#3D6BE5',
    fontWeight: '700',
    fontSize: 20,
  },
  survey: {
    marginTop: 30,
    marginLeft: 35,
  },
  buttons: {
    flexDirection: 'row',
  },
  surveyButton: {
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    color: '#3D6BE5',
  },
  surveyButtonText: {
    color: '#3D6BE5',
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 30,
    width: 40,
  },
  enterScore: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'center',
  },
  image: {
    height: 15,
    resizeMode: 'contain',
    transform: [{ rotate: '90deg' }],
    alignSelf: 'left',
    marginLeft: -170,
    marginTop: 70,
    marginBottom: 20,
    justifyContent: 'start',
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 30,
  },
  barText: {
    alignSelf: 'center',
    padding: 10,
    color: 'white',
    fontWeight: '700',
  },
});
