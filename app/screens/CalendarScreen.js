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
import { IP_ADDRESS, MONTHS, SPORTS_NAMES, COLLEGES, SPORTS_MAPPING} from "../utils/constants"


const screenWidth = Dimensions.get('window').width;

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
  const [monthMatches, setMonthMatches] = useState({});

  const getDateMatches = async({day = null, month = null, year = null, college = null, sport = null}) => {
  try {
    await fetch(IP_ADDRESS + '/getdatematches', {
    method: 'post',
    mode: 'no-cors',
    headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
    },
    body: JSON.stringify({
              'day': day,
              'month': month,
              'year': year,
              'college': college,
              'sport': sport
    })
    }).then((response =>response.json()))
    .then((responseData) => {
          var allMatches = []
          for (var i = 0; i < responseData.length; i++) {
              allMatches.push(responseData[i]);
          }
          setMonthMatches(allMatches)
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
                      width: screenWidth / 2,
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
                      width: screenWidth / 2,
                      marginTop: 150,
                      marginLeft: screenWidth / 2,
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
                  onDayPress={date => {
                      const dateString = date['dateString'];
                      setSelectedDay(dateString);
                      getDateMatches({month: date['month'], year: date['year'], day: date['day']});
                      setTimespanText(date['month'] + '/' + date['day']);
                  }}
                  onVisibleMonthsChange={date => {
                      getDateMatches({month: date[0]['month'], year: date[0]['year']});
                      setTimespanText(MONTHS[date[0]['month']])
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
          <FlatList style={{backgroundColor: '#3159C4', height: screenWidth}}
                  data = {monthMatches}
                  showsVerticalScrollIndicator = {false}
                  renderItem={(itemData) => {
                      return (
                          <View style={{ flexDirection: "row", padding: 6, justifyContent: "space-between", alignItems: "center"}}>
                          <Text style={[styles.body, styles.userMatchData]}>
                              {itemData.item.college1Abbrev} vs. {itemData.item.college2Abbrev} @ {itemData.item.startTime.slice(0,10)}
                              {SPORTS_MAPPING[itemData.item.sport]['emoji']} {itemData.item.location}
                          </Text>
                      </View>
                      )
                  }}>
          </FlatList>
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
      height: screenWidth
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
      height: 60,
      width: screenWidth,
      backgroundColor: '#3159C4',
      paddingTop: 20
  },
  timespanText: {
      padding: 30,
      bottom: 25,
      fontWeight: '70',
      flex: 2,
      textAlign: 'left',
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
      width: 150,
      position: 'absolute',
      backgroundColor: 'white',
      alignItems: 'center'
  },
  displayedMatches: {
      height: 200,
      top: 60,
      left: -10
  },
  userMatchData: {
  flexDirection: "row",
  alignItems: "left",
      color: 'white'
},
  inputBox: {
      width: screenWidth / 2,
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
      fontSize: 20,
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
