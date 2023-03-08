import {
    StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Flags from '../components/Flags'
import { Rect } from 'react-native-svg';

const ProfileScreen = (props) => {
    const onPressItem = () => {
        props.navigation.goBack();
    }
	const onPressCoins = () => {
        console.log("coins pressed");
    }
	//TODO: get image from user's respective college
	const data = ["Ezra Stiles", "Benjamin Franklin"]
	const userCoins = 0

    return (
		<View style={[styles.container, {flex: 1}]}>
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
				<View style={styles.content}>
					<Flags college={data[0]}></Flags>
					<Text style={styles.name}>Name</Text>
					<Text style={styles.title}>College</Text>
					<Text style={styles.title}>netID</Text>
				</View>
			</View>

		</View>
    )
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
})