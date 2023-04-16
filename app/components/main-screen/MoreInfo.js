import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, { useState, useEffect, useCallback } from "react";
import Participants from './Participants';
import QRCodeModal from '../QRCodeModal';
import QRCode from 'react-native-qrcode-svg';
import { google } from "calendar-link";
import { Linking } from "react-native";

function MoreInfo({match, extraData}) {
    const [tab, setTab] = useState("More Info");
    const [isAdmin, setIsAdmin] = useState(false);
  
    function changeParticipants() {
      setTab("Participants")
    }
  
    function changeMoreInfo() {
      setTab("More Info")
    }

    function endQRCodeHandler() {
        setQRCodeIsVisible(false);
    }
    function startQRCodeHandler() {
        setQRCodeIsVisible(true);
    }
    const [QRCodeIsVisible, setQRCodeIsVisible] = useState(false);

    function checkUserPerm(){
      if (extraData["role"] == "admin"){
        setIsAdmin(true);
      }
      else{
        setIsAdmin(false);
      }
    }

    const OpenURLButton = ({ url }) => {
      //pasted from expo docs
      const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
  
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      }, [url])
      return (
        <TouchableOpacity style={styles.addToCalButton} onPress={handlePress}>
          <View style={styles.calendarContainer}>
            <Image source={require("../../assets/images/calendar-icon.png")} style={styles.image}/>
          </View>
        </TouchableOpacity>
      );
    };

    const event = {
      title:
        match.college1 +
        " vs. " +
        match.college2 +
        ": " +
        match.sport,
      description:
        match.college1 +
        " and " +
        match.college2 +
        " face off in a game of " +
        match.sport,
      start: match.startTime,
      end: match.endTime,
      location: match.location,
    };
    const link = google(event);

    useEffect(() => { // runs once to update data at the first render
      checkUserPerm();
    }, []); 

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
                      <Text style={styles.moreinfo2}> {match.location}</Text> 
                      <OpenURLButton
                      url={link}
                      />
                      {
                        isAdmin ? 
                        <TouchableOpacity style={styles.addToCalButton}
                        onPress={startQRCodeHandler}>
                            <QRCode
                              value={"exp://172.27.112.229:19000/--/userqrcode?matchId="+match.matchId}
                              size={40}
                          />
                        </TouchableOpacity>
                          : <View></View>
                      }
                      <QRCodeModal
                          onCancel={endQRCodeHandler}
                          visible={QRCodeIsVisible}
                          matchId={match.matchId}
                          extraData={extraData}
                      />
                    </View>
                : 
                  <Participants participants={match.participants} />
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
        alignItems: "center",
        justifyContent: "center",
      },
      moreinfo2: {
        color: "#1A3B93",
        fontSize: 20,
        fontWeight: "700", 
        alignItems: "center",
        justifyContent: "center",
      }, 
      moreinfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      addToCalButton: {
        backgroundColor: "#DFE5F2",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        margin: 10,
      },
      addToCalText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#3159C4",
        textAlign: "center",
        textAlignVertical: "center",
      },
      calendarContainer: {
        backgroundColor: 'rgba(49, 89, 196, 0.08)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
  },
})