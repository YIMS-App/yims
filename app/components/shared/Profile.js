import {
    StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native'

const Profile = (props) => {

    const onPressItem = () => {
        props.changeModalVisibility(false);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressItem}>
                <Image style={styles.ximage} source={require('../../assets/images/x-button.png')} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.name}>NetID</Text>
                <Text style={styles.title}>Role</Text>
                <Text style={styles.title}>College</Text>
            </View>
        </View>
    )
}

export {Profile}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3159C4",
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        flex: .75,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 60,
        marginRight: 30,
    },
    ximage: {
        width: 50,
        height: 50,
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