import { StyleSheet, Text, View } from 'react-native';

function Participants(props) {
    let participants = [];

    for(let i = 0; i < props.participants.length; i++ ) {
        participants.push(
            <View style={styles.circle} key={props.participants[i]}>
                <Text style={styles.circleText}t>
                    {props.participants[i]}
                </Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {participants}
        </View>
    )
}

export default Participants;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        
    },
    circle: {
        width: 60,
        height: 60, 
        borderRadius: 30,
        backgroundColor: "#3D6BE5", 
        margin: 5,
        borderColor: "#1A3B93",
        borderWidth: 3,
    },
    circleText: {
        color: "white",
        paddingLeft: 9, 
        paddingTop: 12,
        fontWeight: '700', 
        fontSize: 25,
    } 

});