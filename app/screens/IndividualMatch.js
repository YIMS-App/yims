

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import React, { useState, useEffect } from "react";

import Banner from '../components/main-screen/Banner';
import Countdown from '../components/main-screen/Countdown';
import MoreInfo from '../components/main-screen/MoreInfo';

function IndividualMatch(props) {

  const matchData = props.route.params.data;

  const [display, setDisplay] = useState(true);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const onChanged1 = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("Please enter numbers!");
        }
    }
    setScore1(newText);
}

const onChanged2 = (text) => {
  let newText = '';
  let numbers = '0123456789';

  for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
          newText = newText + text[i];
      }
      else {
          alert("Please enter numbers!");
      }
  }
  setScore2(newText);
}

  const emoji = {soccer: "⚽"};

  const dummy = {
    score1: 1,
    score2: 0,
    participants: ["AX", "BX", "CO"],
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image style={styles.image} source={require('../assets/images/blue-down-arrow.png')}/>
      </TouchableOpacity>

      <Banner 
        date={matchData.startTime} 
        college1={matchData.college1} 
        college2={matchData.college2} 
        score1={dummy.score1}
        score2={dummy.score2}
        sport={emoji[matchData.sport]}
      />

      <View style={styles.whitespace}></View>

      {/* MORE INFO + PARTICIPATION  */}
      <View style={styles.stretch}>
        <MoreInfo 
        location={matchData.location}
        participants={dummy.participants}
        />
      </View>

      {/* BETTING */}    
      <View style={styles.betting}>
        { display ? 
          <View> 
            <Text style={styles.bettingTitle}> Place Your Bet Now! </Text> 
            <View style={styles.center}> 
              <Countdown />
              <View style={styles.survey}>
                <Text style={styles.winner}>
                  Select Winner: 
                </Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.surveyButton}>
                    <Text style={styles.surveyButtonText} >{matchData.college1}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.surveyButton}>
                    <Text style={styles.surveyButtonText}>{matchData.college2}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.winner}>
                  Select Final Score: 
                </Text>

                <SafeAreaView style={styles.enterScore}> 
                <Text style={styles.winner}>
                  Select Final Score:   
                </Text>
                <TextInput
                    keyboardType='numeric'
                    onChangeText={text => onChanged1(text)}
                    value={score1}
                    style={styles.input}
                    placeholder='Winner'
                    maxLength={10}
                />
                  <Text style={styles.dash}> - </Text>
                <TextInput
                    keyboardType='numeric'
                    onChangeText={text => onChanged2(text)}
                    value={score2}
                    style={styles.input}
                    placeholder='Loser'
                    maxLength={10}
                />
                </SafeAreaView>

                <Text style={styles.winner}>
                  Select Bet: 
                </Text>
              </View>

            </View>

          </View> 
          :
          <View> 
            <Text style={styles.bettingTitle}> The Bets are In </Text> 
          </View>
        }
      </View>

    </View>
  );
}

export default IndividualMatch;

const styles = StyleSheet.create({

  // overall background
  container: {
    flex: 1,
    backgroundColor: "#DFE5F2",
    alignItems: 'center',
    justifyContent: 'start',
  },
  whitespace: {
    height: 25,
  },
  stretch: {
    alignSelf: 'stretch',
  },
  // betting!!
  betting: {
    marginTop: 50,
  },
  bettingTitle: {
    color: "#3D6BE5",
    fontSize: 20,
    fontWeight: "700", 
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  center: {
    marginRight: 25,
    marginTop: 5,  
  }, 
  winner: {
    color: "#3D6BE5", 
    fontWeight: "700", 
    fontSize: 20,
  }, 
  survey: {
    marginTop: 30, 
    marginLeft: 35,
  }, 
  buttons: {
    flexDirection: "row",
  }, 
  surveyButton: {
    backgroundColor: "white",
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25, 
    marginBottom: 15,
    padding: 10, 
    borderRadius: 10,
    color: "#3D6BE5", 
  }, 
  surveyButtonText: {
    color: "#3D6BE5",
    fontWeight: "700", 
    fontSize: 14,  
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10, 
    height: 30, 
    width: 40, 
  }, 
  enterScore: {
    flexDirection: "row",
    margin: 10, 
    alignSelf: "center"
  }, 
  image: {
    height: 15,
    resizeMode: "contain",
    transform: [{rotate: '90deg'}],
    alignSelf: "left",
    marginLeft: -170,
    marginTop: 70, 
    marginBottom: 20,
    justifyContent: "start",
  }, 
},
);
