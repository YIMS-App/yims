import {
    StyleSheet, Text, View,
    ScrollView, TouchableOpacity,
    SafeAreaView
} from 'react-native'

import React, {useCallback} from "react";
import {Calendar} from 'react-native-calendars';
import NavBar from "../components/main-screen/NavBar";
import FilterButton from "../components/main-screen/FilterButton";
import {Linking} from "react-native";

const OpenURLButton = ({ url, children }) => {
    // pasted from expo docs
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

export default function CalendarScreen(props) {

    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10))

    return (
        <View style={styles.container}>
            <NavBar navigation={props.navigation} title={"Calendar"} color={'white'}/>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <FilterButton>
                    
                </FilterButton>
                <Calendar 
                minDate=''
                markedDates={{
                    [selectedDay]: {selected: true},
                }}
                onDayPress={day => {
                    const dateString = day['dateString']
                    setSelectedDay(dateString)
                }}
                />
            </SafeAreaView>
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
