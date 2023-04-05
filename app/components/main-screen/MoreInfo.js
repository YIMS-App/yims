import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useState } from "react";
import Participants from './Participants';

function MoreInfo(props) {
    const [tab, setTab] = useState("More Info");
  
    function changeParticipants() {
      setTab("Participants")
    }
  
    function changeMoreInfo() {
      setTab("More Info")
    }
    return (
        <View>
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.button} onPress={() => {changeMoreInfo()}}>
                    <Text style={styles.buttonText}>More Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {changeParticipants()}}>
                    <Text style={styles.buttonText}>Participants</Text>
                </TouchableOpacity>
            </View>
        
            <View style={styles.tab}> 
                { tab == 'More Info' ? 
                    <View style={styles.moreinfo}>
                    <Text style={styles.moreinfo1}>Location: </Text>
                    <Text style={styles.moreinfo2}> {props.location}</Text> 
                    </View>
                : 
                    <Participants participants={props.participants} />
                }
            </View>
        </View>

    )
}

export default MoreInfo;

const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row",
      },
      button: {
        backgroundColor: "#3D6BE5", 
        height: 50,
        flex: 1,
        alignItems: 'center',
        marginLeft: 15, 
        marginRight: 15, 
        paddingTop: 5,
        borderRadius: 10,
        zIndex: 1,
    
      }, 
      buttonText: {
        color: "white",
        fontSize: 15, 
        fontWeight: "700"
      },
      line: {
        backgroundColor: "#3D6BE5",
        height: 3,
        alignSelf: 'stretch',
      },
      tab: {
        padding: 10,
        backgroundColor: "white",
        alignSelf: 'stretch',
        alignItems: "center",
        zIndex: 2,
        margin: -25,
        borderColor: "#3D6BE5", 
        borderWidth: 3,
      }, 
      moreinfo1: {
        color: "#1A3B93",
        fontSize: 20,
      },
      moreinfo2: {
        color: "#1A3B93",
        fontSize: 20,
        fontWeight: "700", 
      }, 
      moreinfo: {
        flexDirection: "row",
      },
})