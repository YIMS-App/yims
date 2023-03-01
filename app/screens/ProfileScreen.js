import {
    StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Flags from '../components/Flags'

const ProfileScreen = (props) => {

    const onPressItem = () => {
        props.navigation.goBack();
    }
	//TODO: get image from user's respective college
	const data = ["Ezra Stiles", "Benjamin Franklin"]

    return (
		<View style={[styles.container]}>
			<LinearGradient 
			colors={['#3159C4', '#002075']}
			style={[styles.gradient]}></LinearGradient>
			<TouchableOpacity style={styles.button} onPress={onPressItem}>
				<Image resizeMode='contain' style={styles.ximage} source={require('../assets/images/back-button.png')} />
			</TouchableOpacity>

			<View style={styles.content}>
				<Flags college={data[0]}></Flags>
				<Text style={styles.name}>Name</Text>
				<Text style={styles.title}>College</Text>
				<Text style={styles.title}>netID</Text>
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
		zIndex: 1,
	},
    content: {
		flexDirection: 'column',
		zIndex: 2,
        flex: 2,
		zIndex: 2,
    },
    button: {
        flex: 1,
		justifyContent: "flex-start",
        marginHorizontal: 30,
		top: "-10%",
		flexDirection: 'column',
		zIndex: 2,
		width: 20,
		height: 20
    },
    ximage: {
        alignSelf: 'left',
        width: 20,
        height: 20,
        flex: 1,
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