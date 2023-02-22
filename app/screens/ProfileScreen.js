import {
    StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native'

const ProfileScreen = (props) => {

    const onPressItem = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressItem}>
                <Image resizeMode='contain' style={styles.ximage} source={require('../assets/images/back-button.png')} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.name}>NetID</Text>
                <Text style={styles.title}>Role</Text>
                <Text style={styles.title}>College</Text>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3159C4",
        flex: 1,
		flexDirection: 'column',
    },
    content: {
        justifyContent: 'center',
        flex: 1,
    },
    button: {
        flex: 1,
        alignSelf: 'left',
        marginHorizontal: 30,
        top: '-17%',
        alignItems: "start",
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