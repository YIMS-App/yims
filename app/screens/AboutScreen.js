import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
  } from "react-native";

import NavBar from "../components/main-screen/NavBar";


export default function AboutScreen(props) {

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
                    YIMS was created by Alejandro Gonzales (‘24), Anna Xu (‘24), Bienn Viquiera (‘24), Cierra Ouellette (‘24), Edward Yang (MS '23), Mary Jiang (‘24), and Kelly Qiang (‘24) for their Full Stack Web Development and Software Engineering classes in Fall 2022/Spring 2023.
                    </Text>
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
        textAlign: 'center',
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

