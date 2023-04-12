import {
    StyleSheet, Text, View,
    ScrollView, TouchableOpacity,
    FlatList
} from 'react-native'

import React, { useCallback} from "react";
import EmojiGuide from '../components/main-screen/EmojiGuide';
import NavBar from "../components/main-screen/NavBar";
import {Linking} from "react-native";

const fallsports = [
    {
        sport: 'Soccer',
        points: 11, 
        emoji: "⚽"
    }, 
    {
        sport: 'Flag football',
        points: 6, 
        emoji: "🏈"
    }, 
    {
        sport: 'Spikeball',
        points: 6, 
        emoji: "🦔"
    }, 
    {
        sport: 'Pickeball',
        points: 6, 
        emoji: "🥒"
    }, 
    {
        sport: 'Cornhole',
        points: 6, 
        emoji: "🌽"
    }, 
    {
        sport: 'Ping Pong',
        points: 10, 
        emoji: "🏓"
    }
]

wintersports = [
    {
        sport: 'Basketball',
        points: 5, 
        emoji: "🏀"
    }, 
    {
        sport: 'Dodgeball',
        points: 8, 
        emoji: "🤾"
    }, 
    {
        sport: 'Indoor Soccer',
        points: 5, 
        emoji: "🥅"
    }, 
    {
        sport: 'Volleyball',
        points: 6, 
        emoji: "🏐"
    }, 
    {
        sport: 'Broomball',
        points: 6, 
        emoji: "🧹"
    }, 
    {
        sport: 'Inner Tube Water Polo',
        points: 6, 
        emoji: "🤽"
    }
]
const OpenURLButton = ({ url, children }) => {
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
    }, [url]);

    return <TouchableOpacity title={children} onPress={handlePress}>
    <View>
        <Text>{children}</Text>
    </View>
    </TouchableOpacity>;

}

export default function HowToPlay(props) {

    const link = "https://intramurals.yale.edu/tyng-cup-point-system"

    return (
        <View style={styles.container}>
            <NavBar navigation={props.navigation} title={"How To Play"} color={'white'} extraData = {props.extraData}/>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.linecontainer}>
                    <View style={styles.line} />
                        <View>
                            <Text style={[styles.title, {marginTop: '20%'}]}>Overview</Text>
                        </View>
                    <View style={styles.line} />
                </View>
             
                <Text style={[styles.title2, {marginTop: '5%'}]}>What are Intramural Sports?</Text>
                <Text style={styles.body}>
                Every year Yale’s 14 colleges compete in various intramural sports. The college with the most points at the end of Spring Semester wins the famous Tyng Cup.              </Text>
                <Text style={[styles.title2]}>How are points tallied?</Text>
                <View style={styles.link}>
                    <OpenURLButton url = {link}><Text style={styles.body}>Read about the Tyng Cup Point System here.</Text></OpenURLButton>
                </View>

                <View style={styles.linecontainer}>
                    <View style={styles.line} />
                        <View>
                            <Text style={[styles.title, {marginTop: '10%'}]}>Sport Point Values</Text>
                        </View>
                    <View style={styles.line} />
                </View>

                <EmojiGuide />

                <View style={styles.emptyspace}></View>

            </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3D6BE5",
        flex: 1,
    },
    scrollContainer: {
        marginLeft: 5,
        marginRight: 3,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 50,
    },
    linecontainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    line: {
        flex: 1, 
        height: 2, 
        backgroundColor: 'white',
        marginRight: 15,
        marginLeft: 15,
        marginTop: 20,
    },
    title: {
        alignSelf: 'center',
        fontSize: 20, 
        fontWeight: '700',
        color: 'white',
    },
    sport: {
        fontSize: 18, 
        fontWeight: '300',
        color: 'white',
        marginLeft: 25,
        marginRight: 25, 
    },
    body: {
        fontSize: 15, 
        fontWeight: '300',
        color: 'white',
        margin: 15,
        marginLeft: 25,
        marginRight: 25,
    },
    title2: {
        fontSize: 20, 
        fontWeight: '700',
        color: 'white',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20,  
        alignSelf: 'center' ,
    },
    link: {
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 10,
        margin: 15,
        marginLeft: 25,
        marginRight: 25,
        padding: 10,
    },
    emptyspace: {
        height: 100,
    },
})
