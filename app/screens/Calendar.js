import {
    StyleSheet, Text, View,
    ScrollView, TouchableOpacity,
    SafeAreaView, FlatList, Dimensions
} from 'react-native'

import React, {useCallback} from "react";
import {Calendar} from 'react-native-calendars';
import NavBar from "../components/main-screen/NavBar";
import {Linking} from "react-native";
import { ModalDropdown } from "../components/shared/ModalDropdown";
import { useState } from "react";
import { MONTHS, SPORTS_NAMES, COLLEGES } from "../utils/constants"

const screenWidth = Dimensions.get('window').width / 2;

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
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
    const link = "https://yaleshuttle.doublemap.com/map/"
    const monthNames = []
    for (var key in MONTHS){
        monthNames.push(MONTHS[key])
    }
    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10))
    const [timespanText, setTimespanText] = useState("Today:");
    const [sportFilterText, setSportFilterText] = useState(SPORTS_NAMES[0]);
    const [collegeFilterText, setCollegeFilterText] = useState(COLLEGES[0]);

    const matches = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
    
    const getDateMatches = async(netid) => {
		try {
			await fetch(IP_ADDRESS + '/getdatematches', {
			method: 'post',
			mode: 'no-cors',
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                'netid': netid,
                'day': day,
                'month': month,
                'year': year,
                'college': college,
                'sport': sport
			})
		  }).then((response =>response.json()))
		  .then((responseData) => {
			console.log
		  });
		  }
		  catch(e) {
			console.log(e)
		  }
	}

    return (
        <View style={styles.container}>
            <NavBar navigation={props.navigation} title={"Calendar"} color={'#3D6BE5'} extraData = {props.extraData}/>
            <View style={styles.filterContainer}>
                <View style={styles.modalContainer}>
                    <ModalDropdown
                    filterTextStyle={styles.inputText}
                    filterText={collegeFilterText}
                    filterButtonStyle={styles.inputBox}
                    dropdownStyle={styles.collegeDropdown}
                    dropdownTextStyle={styles.collegeDropdownText}
                    dropdownTextHighlightStyle={styles.collegeDropdownTextSelected}
                    modalStyle={[
                    styles.modal,
                    {
                        width: 300,
                        marginTop: 150,
                        height: "50%",
                    },
                    ]}
                    options={COLLEGES}
                    setData={(college) => {setCollegeFilterText(college)}}
                    />
                </View>
                <View style={styles.modalContainer}>
                    <ModalDropdown
                    filterTextStyle={styles.inputText}
                    filterText={sportFilterText}
                    filterButtonStyle={styles.inputBox}
                    dropdownStyle={styles.collegeDropdown}
                    dropdownTextStyle={styles.collegeDropdownText}
                    dropdownTextHighlightStyle={styles.collegeDropdownTextSelected}
                    modalStyle={[
                    styles.modal,
                    {
                        width: 200,
                        marginTop: 150,
                        marginLeft: screenWidth,
                        height: "50%",
                    },
                    ]}
                    options={SPORTS_NAMES}
                    setData={(sport) => {setSportFilterText(sport)}}
                    />
                </View>
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.calendar}>
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
            <View style={styles.scheduleContainer}>
                <Text style={styles.timespanText}>{timespanText}</Text>
                <View style={styles.link}>
                    <OpenURLButton url={link}>
                        <Text style={styles.body}>Shuttle Schedule</Text>
                    </OpenURLButton>
                </View>
            </View>
            <View style={styles.displayedMatches}>
                <FlatList
                data = {matches}
                showsVerticalScrollIndicator = {false}
                renderItem={(itemData) => {
                    return (
                        <View style={{ flexDirection: "row", padding: 6, justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={[styles.body, styles.userMatchData]}>
                            {itemData.item.title}
                        </Text>
                    </View>
                    )
                }}>
                </FlatList>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    },
    body: {
        fontSize: 15, 
        fontWeight: '300',
        color: 'black',
        margin: 15,
        marginLeft: 25,
        marginRight: 25,
    },
    scrollContainer: {
        marginTop: 50,
    },
    filterContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 60
    },
    filter: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        height: 30,
        width: 20,
        margin: 4
    },
    title: {
    },
    scheduleContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flex: 5,
        backgroundColor: '#3159C4',
        justifyContent: 'flex-end'
    },
    timespanText: {
        padding: 20,
        flexDirection: 'column',
        fontWeight: '70',
        flex: 2,
        textAlign: 'left',
        height: 500,
        backgroundColor: '#3159C4',
        fontSize: 28, 
        fontWeight: '700',
        color: 'white',
    },
    link: {
        right: 1,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 100,
        margin: 15,
        padding: 10,
        width: 200,
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    displayedMatches: {
        flexDirection: 'row',
        top: 60,
        padding: 20,
    },
    userMatchData: {
		flexDirection: "row",
		alignItems: "left",
        color: 'white'
	},
    inputBox: {
        width: screenWidth,
        height: 50,
        backgroundColor: "#3159C4",
        marginBottom: 10,
        justifyContent: "center",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "white",
    },
    inputText: {
        color: "white",
        textAlignVertical: "center",
        marginLeft: 15,
        fontSize: 25,
        fontWeight: "300",
    },
    collegeDropdown: {
        borderRadius: 8,
      },
      collegeDropdownText: {
        color: "#3159C4",
        fontSize: 25,
        fontWeight: "300",
        marginLeft: 15,
        marginTop: 5,
    },

  collegeDropdownTextSelected: {
    backgroundColor: "#7195F6",
    fontSize: 25,
    fontWeight: "300",
    marginLeft: 5,
    color: "white",
  },
  modalContainer: {
    backgroundColor: 'white'
  },

  modal: {
    backgroundColor: "white",
    borderRadius: 20
  },
})
