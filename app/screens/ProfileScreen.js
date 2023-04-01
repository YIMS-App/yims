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

	useEffect(() => { // runs once to update data at the first render
        setCoins(username);
		setUserInfo(username);
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
	const setUserInfo = async(netid) => {
		try {
			await fetch(IP_ADDRESS + '/getuserdata', {
				method: 'post',
				mode: 'no-cors',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"netid": netid
				})
			}).then((response => response.json()))
			.then((responseData) => {
				console.log(responseData);
				setCollege(college_mapping[responseData['college']])
				setName(responseData['firstName'] + ' ' + responseData['lastName'])
				setLoading(false);
			})
		}
		catch(e) {
			console.log(e)
		}
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
			<View>
				<FlatList></FlatList>
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
		zIndex: 2,
		top: "-24%",
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
	}
})