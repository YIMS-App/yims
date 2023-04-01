import { Modal, Text, TouchableOpacity, StyleSheet, View, Image} from "react-native";

export default function MatchDetails( { match, visible }) {

    function cancelDataHandler() {
        
    };
    return (
        <Modal visible={visible} animationType="slide" transparent={true} testID="match-details-modal">
            <View>
                <View>
                    <TouchableOpacity onPress={() => cancelDataHandler()}>
                        <Image source={require("../../assets/images/x-button.png")} style={styles.cancelButton}/>
                    </TouchableOpacity>
                </View>
                <Text>Match Details</Text>
                <Text testID="match-standings-college1">{match.college1}</Text>
                <Text testID="match-standings-college2">{match.college2}</Text>
                <Text testID="match-standings-sport">{match.sport}</Text>
                <Text testID="match-standings-location">{match.location}</Text>
                <TouchableOpacity>
                    <Text>Add to GCal</Text>
                </TouchableOpacity>
            </View>
            
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    inputContainer: {
      justifyContent: "flex-start",
      width: "90%",
      backgroundColor: "#3159C4",
      alignSelf: "center",
      borderRadius: 50,
      padding: 10,
    },
  });
  