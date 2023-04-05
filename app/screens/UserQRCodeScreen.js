import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Modal,
    RefreshControl,
  } from "react-native";
import React, { useCallback, useEffect} from "react";
import LottieView from 'lottie-react-native';
import assets from "../assets";
import { IP_ADDRESS } from "../utils/constants.js";


export default function UserQRCodeScreen(props) {

    /* TODO: MUST ENSURE THAT USER IS LOGGED IN */
    // if not props["route"]
    // send user to login screen

    //TODO: fetch user's college id using the abbreviation stored in their userData
    const collegeId = 2;

    // const userProp = props.extraData.username;
	// const username = userProp.replace(/['"]+/g, '');

    useEffect(() => { // runs once to update data at the first render
        //const userProp = props["route"]["params"]["username"];
        //console.log(userProp)
        console.log(props["route"]["params"]["matchId"]);
        const matchId = props["route"]["params"]["matchId"];
		fetchUserInfo('cmo48', matchId);
      }, []); 

    const fetchUserInfo = async(netid, matchid) => {
		try {
			await Promise.all([fetch(IP_ADDRESS + '/getuserdata', {
				method: 'post',
				mode: 'no-cors',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"netid": netid
				})
            }),
            fetch(IP_ADDRESS + '/getparticipationmatch', {
				method: 'post',
				mode: 'no-cors',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"netid": netid,
                    "matchid": matchid,
				})
			}),
            ])
			.then(([userInfo, participationStatus]) => 
				Promise.all([userInfo.json(), participationStatus.json()]))
			.then(([userInfoData, participationStatusData]) => {
                console.log("Data" + userInfoData)
                console.log("Status" + participationStatusData)
                // TODO: fetch user status for this match

                // if user status != 2:
                    //addParticipationPointsToCollege(collegeId, 17) //TODO: change number of points to be variable based on sport?
                    //addParticipationPointsToUser(netid, 17)
                    updateMatchParticipation(netid, 2, 3)
                // else change message to say 'you've already earned points for this game!'
				//setUserInfo(userInfoData);
			})
		}
		catch(e) {
			console.log(e)
		}
	}

    const addParticipationPointsToCollege = async(collegeId, participationPoints) => {
        try {
          await fetch(IP_ADDRESS + '/addparticipationpointscollege', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "id": collegeId,
            "part_score": participationPoints,
          })
        });
        }
        catch(e) {
          console.log(e)
        }
      };

      const addParticipationPointsToUser = async(netid, participationPoints) => {
        try {
          await fetch(IP_ADDRESS + '/addparticipationpointsuser', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "netid": netid,
            "participationPoints": participationPoints,
          })
        });
        }
        catch(e) {
          console.log(e)
        }
      };

      const updateMatchParticipation = async(netid, status, matchId) => {
        try {
          await fetch(IP_ADDRESS + '/updateparticipation', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "netid": netid,
            "status": status,
            "matchid": matchId,
          })
        });
        }
        catch(e) {
          console.log(e)
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Great Job! You've earned X attendance points. </Text>
            <LottieView source={assets.lottieFiles.coin} autoPlay loop style={styles.animationContainer}/>
            <TouchableOpacity 
                style={styles.doneButton}
                onPress={() => props.navigation.navigate("Leaderboard")}>
                <Text style={styles.blueText}>done</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#3D6BE5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationContainer: {
        width: 200,
        height: 200,
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    blueText: {
        color: '#3D6BE5',
        fontSize: 20,
        textAlign: 'center',
    },
    doneButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
    }
});


