import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  RefreshControl,
} from "react-native";
import React, { useCallback } from "react";
import { google } from "calendar-link";
import { Linking } from "react-native";

import { useState, useEffect } from "react";
import NavBar from "../components/main-screen/NavBar";
import { COLLEGES, IP_ADDRESS } from "../utils/constants";
import { ModalDropdown } from "../components/shared/ModalDropdown";

export default function UpcomingMatchesScreen(props) {
  const [matches, setMatches] = useState([]);
  const [filterMatches, setfilterMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("All Colleges");
  const [isModalVisible, setisModalVisible] = useState(false);
  const shuttleLink =
    "https://sportsandrecreation.yale.edu/field-shuttle-bus-schedule";
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [sports, setSports] = useState({});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMatchesScores();
  }, []);

  const handleSelectedMatch = (match) => {
    if (selectedMatch == match) setSelectedMatch("");
    else setSelectedMatch(match);
  };

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const fetchMatchesScores = async () => {
    Promise.all([
      fetch(IP_ADDRESS + "/getfuturematches"),
      fetch(IP_ADDRESS + "/getallsportscores"),
    ])
      .then(([resMatches, resSports]) =>
        Promise.all([resMatches.json(), resSports.json()])
      )
      .then(([matchesData, sportsData]) => {
        setMatches(matchesData["matches"]);
        setfilterMatches(matchesData["matches"]);
        setSports(sportsData);
        setLoading(false);
      });
    setRefreshing(false);
  };

  const OpenURLButton = ({ url, buttonStyle, textStyle, text }) => {
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

    return (
      <TouchableOpacity style={buttonStyle} onPress={handlePress}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const setData = (college) => {
    setFilterText(college);
    if (college != "All Colleges") {
      setfilterMatches(
        matches.filter(function (match) {
          if (match.college1 == college || match.college2 == college) {
            return match;
          }
        })
      );
    } else {
      setfilterMatches(matches);
    }
  };
  useEffect(() => {
    // runs once to update data at the first render
    fetchMatchesScores();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center", flex: 1 },
          ]}
        >
          <NavBar
            navigation={props.navigation}
            title={"Upcoming Matches"}
            color={"#3159C4"}
            extraData={props.extraData}
          />
          <View
            style={[
              styles.container,
              { justifyContent: "center", alignItems: "center", flex: 1 },
            ]}
          >
            <ActivityIndicator animating={true} color="#bc2b78" size="large" />
          </View>
        </View>
      ) : (
        <View>
          <NavBar
            navigation={props.navigation}
            title={"Upcoming Matches"}
            color={"#3159C4"}
            extraData={props.extraData}
          />
          <View style={styles.headerContainer}>
            <ModalDropdown
              filterText={filterText}
              dropdownTextStyle={styles.dropdownTextStyle}
              dropdownStyle={styles.dropdownStyle}
              modalStyle={styles.modalStyle}
              filterButtonStyle={styles.filterButton}
              filterTextStyle={styles.filterText}
              setData={setData}
              options={COLLEGES}
            />
            {/* <SafeAreaView>
                <TouchableOpacity
                  onPress={() => changeModalVisibility(true)}
                  style={styles.filterButton}
                >
                  <Text style={styles.filterText}>{filterText}</Text>
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  animationType='fade'
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisibility(false)}
                >
                  <ModalDropdown 
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                    options={COLLEGES}
                  />
                </Modal>
            </SafeAreaView> */}
          </View>
          <OpenURLButton
            url={shuttleLink}
            buttonStyle={styles.shuttleButton}
            textStyle={styles.shuttleText}
            text={"Shuttle Schedule"}
          ></OpenURLButton>
          <View style={styles.matchesContainer}>
            <Text style={styles.year}>2022</Text>
            <FlatList
              refreshControl={
                <RefreshControl
                  colors={["#9Bd35A", "#689F38"]}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              data={filterMatches}
              showsVerticalScrollIndicator={false}
              renderItem={(itemData) => {
                const event = {
                  title:
                    itemData.item.college1 +
                    " vs. " +
                    itemData.item.college2 +
                    ": " +
                    itemData.item.sport,
                  description:
                    itemData.item.college1 +
                    " and " +
                    itemData.item.college2 +
                    " face off in a game of " +
                    itemData.item.sport,
                  start: itemData.item.startTime,
                  end: itemData.item.endTime,
                  location: itemData.item.location,
                };
                const link = google(event);
                let startDateData = itemData.item.startTime;
                let startDate = startDateData.replace(/[-]/g, "/");
                // parse the proper date string from the formatted string.
                startDate = Date.parse(startDate);
                // create new date
                let startDateObj = new Date(startDate);

                let endDateData = itemData.item.endTime;
                let endDate = endDateData.replace(/[-]/g, "/");
                endDate = Date.parse(endDate);
                let endDateObj = new Date(endDate);

                const startDateString = startDateObj.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                });
                const endDateString = endDateObj.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                });
                return (
                  <TouchableOpacity
                    onPress={() => {
                      //handleSelectedMatch(itemData.item);
                      const data = itemData.item;
                      props.navigation.navigate("IndividualMatch", {data, 'extraData': props.extraData,})
                    }}
                  >
                    <View style={styles.futureMatchContainer}>
                      <Text style={styles.futureMatchDate}>
                        {itemData.item.startTime.slice(5, 10)}:{" "}
                      </Text>
                      <Text style={styles.futureMatch}>
                        {itemData.item.college1Abbrev} vs.{" "}
                        {itemData.item.college2Abbrev} @ {startDateString} -{" "}
                        {endDateString}{" "}
                      </Text>
                      <Text>{sports[itemData.item.sport][1]}</Text>
                    </View>
                    <View style={{ height: 7 }}></View>
                    {/*selectedMatch == itemData.item ? (
                      <View style={styles.matchDropdown}>
                        <Text style={styles.locationTitle}>Location: </Text>
                        <Text style={styles.locationText}>
                          {itemData.item.location
                            ? itemData.item.location
                            : "Payne Whitney"}
                        </Text>
                        <OpenURLButton
                          url={link}
                          text={"Add to Calendar"}
                          buttonStyle={styles.addToCalButton}
                          textStyle={styles.addToCalText}
                        ></OpenURLButton>
                      </View>
                    ) : (
                      <View style={{ height: 7 }}></View>
                    )*/}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  matchesContainer: {
    backgroundColor: "#D0D3DA",
    marginTop: 20,
  },
  emptySpace: {
    padding: 10,
  },
  headerContainer: {
    backgroundColor: "white",
    marginTop: 60,
  },
  filterButton: {
    backgroundColor: "#DFE5F2",
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 30,
    marginRight: 30,
    height: 50,
  },
  filterText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#3159C4",
    textAlign: "center",
    textAlignVertical: "center",
  },
  dropdownTextStyle: {
    margin: 20,
    fontSize: 30,
    fontWeight: "Normal",
    color: "#3159C4",
  },
  dropdownStyle: {
    alignItems: "center",
    backgroundColor: "#DFE5F2",
    borderRadius: 20,
  },
  shuttleButton: {
    backgroundColor: "#DFE5F2",
    borderRadius: 8,
    paddingHorizontal: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 100,
    marginRight: 100,
    height: 30,
  },
  shuttleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3159C4",
    textAlign: "center",
    textAlignVertical: "center",
  },
  year: {
    fontSize: 35,
    fontWeight: "700",
    color: "#3159C4",
    marginLeft: 20,
    marginTop: 10,
  },
  futureMatchContainer: {
    flexDirection: "row",
    backgroundColor: "#DFE5F2",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  futureMatchDate: {
    color: "#3159C4",
    fontWeight: "700",
    fontSize: 16,
  },
  futureMatch: {
    color: "#3159C4",
    fontStyle: "italic",
    fontSize: 16,
  },
  modalStyle: {
    paddingHorizontal: 20,
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#DFE5F2",
    borderRadius: 20,
    marginTop: 175,
  },
  matchDropdown: {
    flexDirection: "row",
    backgroundColor: "#3D6BE5",
    marginHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 7,
    padding: 10,
    alignItems: "center",
  },
  addToCalButton: {
    backgroundColor: "#DFE5F2",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    height: 30,
    marginLeft: 30,
  },
  addToCalText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3159C4",
    textAlign: "center",
    textAlignVertical: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  locationTitle: {
    fontSize: 16,
    color: "white",
  },
});
