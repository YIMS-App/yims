import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
  } from "react-native";

import NavBar from "../components/main-screen/NavBar";

const sports = [
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
    }, 
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

export default function AboutScreen(props) {

    const renderItem = ({ item }) => (
        <Text style={[styles.sport]}>{item.sport} {item.emoji} </Text>
      );

    return (
        <View style={styles.container}>
            <NavBar navigation={props.navigation} title={"About"} color={'white'} extraData = {props.extraData}/>
            <ScrollView style={styles.aboutContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>YIMS(Yale Intramural Sports)</Text>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    <Text style={[styles.title, {marginTop: '5%'}]}>Get your head in the game.</Text>
                    <Text style={styles.body}>
                    YIMS is an app that provides the most up to date information on Yale Intramural Sports. If you’re unclear on how IMS work, visit the How To Play page for more infomation on the overall competition and sport specific rules.
                    </Text>
                    <Text style={[styles.title]}>Who created this app?</Text>
                    <Text style={styles.body}>
                    YIMS was created by Alejandro Gonzales (‘24), Anna Xu (‘24), Bienn Viquiera (‘24), Cierra Ouellette (‘24), and Edward Yang (MS '23) for their Full Stack Web Development class in Fall 2022.
                    </Text>
                    <Text style={[styles.title, {marginBottom: 5}]}>⭐ Emoji Guide ⭐</Text>
                    <FlatList
                        data={sports}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={item => item.sport}
                    />
                    <View style={styles.emptyspace}></View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#3D6BE5',
        flex: 1,
    },
    aboutContainer: {
        marginLeft: 5,
        marginRight: 3,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 50,
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: '5%',
        alignSelf: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: 20, 
        fontWeight: '700',
        color: 'white',
    },
    body: {
        fontSize: 15, 
        fontWeight: '300',
        color: 'white',
        margin: 15,
        marginLeft: 25,
        marginRight: 25,
    },
    sport: {
        fontSize: 15, 
        fontWeight: '300',
        color: 'white',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        textAlign: 'center',
    },
    emptyspace: {
        height: 50,
    }
});

