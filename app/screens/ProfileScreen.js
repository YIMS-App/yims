import {
	StyleSheet,
	FlatList,
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Flags from '../components/Flags'
import React, { useState, useEffect } from "react";
import { IP_ADDRESS, college_mapping } from "../utils/constants.js";


const ProfileScreen = (props) => {
	const onPressItem = () => {
		props.navigation.goBack();
	}
	const onPressCoins = () => {
		console.log("coins pressed");
	}
	//TODO: get image from user's respective college
	const [loading, setLoading] = useState(true);
	const [college, setCollege] = useState([]);
	const [name, setName] = useState([]);
	const userProp = props["route"]["params"]["username"];
	const username = userProp.replace(/['"]+/g, '');
	const [userCoins, setUserCoins] = useState([]);
	const [matches, setMatches] = useState([]);
	const [populate, setPopulate] = useState([]);
	const [sports, setSports] = useState({});
	const dummyMatches = [
		{
		  "college1": "Benjamin Franklin",
		  "college1Abbrev": "BF",
		  "college2": "Ezra Stiles",
		  "college2Abbrev": "ES",
		  "sport": "soccer",
		  "location": "school",
		  "startTime": "2007-05-08 12:34:29",
		  "endTime": "2007-05-08 12:35:29",
		  "winner": "Benjamin Franklin",
		  "summary": null
		},
		{
		  "college1": "Jonathan Edwards",
		  "college1Abbrev": "JE",
		  "college2": "Branford",
		  "college2Abbrev": "BR",
		  "sport": "flag football",
		  "location": "school",
		  "startTime": "2007-05-08 12:34:29",
		  "endTime": "2007-05-08 12:35:29",
		  "winner": "Jonathan Edwards",
		  "summary": null
		}
	]


	useEffect(() => { // runs once to update data at the first render\
		setMatches([]);
        setCoins(username);
		fetchUserInfo(username);
      }, []); 
	  
	const setCoins = async(netid) => {
		try {
			await fetch(IP_ADDRESS + '/getparticipationpoints', {
			method: 'post',
			mode: 'no-cors',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  "netid": netid
			})
		  }).then((response =>response.json()))
		  .then((responseData) => {
			setUserCoins(responseData["participationPoints"])
		  });
		  }
		  catch(e) {
			console.log(e)
		  }
	  }
	
	const fetchUserInfo = async(netid) => {
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
			fetch(IP_ADDRESS + '/getuserevents', {
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
			fetch(IP_ADDRESS + "/getallsportscores")])
			.then(([userInfo, userGames, sportsScores]) => 
				Promise.all([userInfo.json(), userGames.json(), sportsScores.json()])
			)
			.then(([userInfoData, userGamesData, sportsData]) => {
				setSports(sportsData);
				let promises = []
				userGamesData = userGamesData.filter(function (match) {
					if (match["status"] == 2) {
					  return match;
					}
				  })
				let foundMatches = []
				userGamesData = userGamesData.filter(function (match) {
					if (match["status"] == 2) {
					  return match;
					}
				  })
				userGamesData.forEach(element => {
					promises.push(
						fetch(IP_ADDRESS + '/matchinfo', {
							method: 'post',
							mode: 'no-cors',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								"matchid": element["matchid"]
							})
						}).then((response) => 
							response.json()
						).catch ((e) => {
						}));
					}
				);
				Promise.all(promises).then(x => { setMatches(x) }).catch((e) => {console.log(e)})

				setUserInfo(userInfoData);
			})
		}
		catch(e) {
			console.log(e)
		}
	}
	const setUserInfo = (data) => {
		setCollege(college_mapping[data['college']])
		setName(data['firstName'] + ' ' + data['lastName'])
		setMatches(populate);
		setLoading(false);
	}

	return (loading ? 
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
          <ActivityIndicator animating={true} color='#bc2b78' size="large"/>
        </View> 
		:
		(
		<View style={styles.container}>
			<LinearGradient 
				colors={['#3159C4', '#002075']}
				style={[styles.gradient]}>
			</LinearGradient>
			<View style={[{flex: 2}]}>
				{/* Go back button */}
				<TouchableOpacity style={styles.button} onPress={onPressItem}>
					<Image resizeMode='contain'
					style={styles.ximage}
					source={require('../assets/images/back-button.png')}/>
				</TouchableOpacity>
				{/* Coins button */}
				<TouchableOpacity style={styles.coinsButton} onPress={onPressCoins}>
					<Image resizeMode='contain'
					style={[styles.coinImage, {}]}
					source={require('../assets/images/coin.png')}/>
					<Text style={[styles.text, {}]}>{userCoins}</Text>
				</TouchableOpacity>
				{/* Names */}
				<View style={styles.content}>
					<Flags college={college}></Flags>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.title}>{college}</Text>
					<Text style={styles.title}>{username}</Text>
				</View>
			</View>
			<View style={styles.container}>
				<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly",
					borderTopColor: "white",
					borderTopWidth: 1,
					borderBottomColor: "white",
					borderBottomWidth: 1,
					marginTop: 10,
				}}
				>
				<Text style={styles.collegeTableHeader}>Date</Text>
				<Text style={styles.collegeTableHeader}>Points</Text>
				<Text style={styles.collegeTableHeader}>Opponent</Text>
				<Text style={styles.collegeTableHeader}>W/L/T</Text>
				<Text style={styles.collegeTableHeader}>Sport</Text>
			</View>
			<FlatList
			data = {matches}
			showsVerticalScrollIndicator = {false}
			renderItem={(itemData) => {
				return (
					<View style={{ flexDirection: "row", padding: 6, justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={[styles.collegeMatchDate, styles.userMatchData]}>
                      {itemData.item.startTime.slice(5, 7) +
                        "/" +
                        itemData.item.startTime.slice(8, 10)}
                    </Text>
                    <Text
                      style={[
                        styles.matchPts,
                        {
                          color: "#1FED27"
                        },
                      ]}
                    >
                      +{" "}
                      {sports[itemData.item.sport][0]
                        }
                      pts
                    </Text>
                    <Text style={[styles.matchOpponent, styles.userMatchData]}>
                      {itemData.item.college1 == college
                        ? itemData.item.college2Abbrev
                        : itemData.item.college1Abbrev}
                    </Text>
                    <Text style={[styles.matchOutcome, styles.userMatchData]}>
                      {itemData.item.winner == college
                        ? "W"
                        : itemData.item.winner == "TIE"
                        ? "T"
                        : "L"}
                    </Text>
                    <Text style={[styles.collegeMatchSport, styles.userMatchData]}>
                      {sports[itemData.item.sport][1]}
                    </Text>
                  </View>
				)
			}}>

			</FlatList>
			</View>
		</View>
	))
}

export default ProfileScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		zIndex: 1,
	},
	gradient: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: 0,
	},
	content: {
		flex: 4,
		flexDirection: 'column',
		zIndex: 2,
	},
	text: {
		zIndex: 2,
		color: "white",
		paddingRight: 10
	},
	button: {
		flex: 1,
		top: "5%",
		marginHorizontal: 30,
		flexDirection: 'row',
		alignSelf: 'left',
		zIndex: 2,
	},
	ximage: {
		flexDirection: 'row',
		alignSelf: 'center',
		width: 20,
		height: 20,
	},
	coinsButton: {
		flexDirection: 'row',
		alignSelf: "flex-end",
		top: "-14%",
		right: 10,
		backgroundColor: "#413232",
		justifyContent: "space-between",
		alignItems: "center",
		height: 30,
		borderRadius: 10,
		minWidth: 80
	},
	coinImage: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	title: {
		alignSelf: 'center',
		fontSize: 20, 
		fontWeight: '700',
		color: 'white',
		margin: 5,
	},
	name: {
		alignSelf: 'center',
		fontSize: 30, 
		fontWeight: '700',
		color: 'white',
		margin: 5,
	},
	list: {
		flex: 2
	},
	collegeTableHeader: {
		flexDirection: "row",
		fontSize: 20,
		color: "white",
		paddingVertical: 3,
		justifyContent: "space-between",
		alignItems: "center"
	},
	collegeMatchDate: {
		fontWeight: "700",
		fontSize: 15,
		color: "white",
		marginLeft: 13,
	},
	matchPts: {
		fontWeight: "700",
		fontSize: 15,
		color: "white",
		marginLeft: 13,
	},
	matchOpponent: {
		fontWeight: "700",
		fontSize: 15,
		color: "white",
		width: 30,
		marginLeft: 55,
	},
	matchOutcome: {
		fontWeight: "700",
		fontSize: 15,
		color: "white",
		width: 20,
		marginLeft: 60,
	},
	collegeMatchSport: {
		marginLeft: 45,
		width: 25,
		fontWeight: "700",
		fontSize: 15,
		color: "white",
	},
	userMatchData: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	}
})
