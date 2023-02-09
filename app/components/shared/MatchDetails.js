import { Modal, Text, TouchableOpacity } from "react-native";

export default function MatchDetails( { match, visible }) {

    function cancelDataHandler() {
        
    };
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View>
                <View>
                    <TouchableOpacity onPress={() => cancelDataHandler()}>
                        <Image source={require("../../assets/images/x-button.png")} style={styles.cancelButton}/>
                    </TouchableOpacity>
                </View>
                <Text>Match Details</Text>
                <Text>{match.college1}</Text>
                <Text>{match.college2}</Text>
                <Text>{match.sport}</Text>
                <Text>{match.location}</Text>
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
  