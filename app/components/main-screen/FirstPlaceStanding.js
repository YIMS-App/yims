import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from "react-native";

function FirstPlaceStanding(props) {

  const collegesData = {
    "Benjamin Franklin": {
      name: "Benjamin Franklin",
      flag: require("../../assets/images/college-logos/franklin-flag.png"),
      points: 0,
    },
    "Berkeley": {
      name: "Berkeley",
      flag: require("../../assets/images/college-logos/berkeley-flag.png"),
      points: 0,
    },
    "Pauli Murray": {
      name: "Pauli Murray",
      flag: require("../../assets/images/college-logos/murray-flag.png"),
      points: 0,
    },
    "Timothy Dwight": {
      name: "Timothy Dwight",
      flag: require("../../assets/images/college-logos/td-flag.png"),
      points: 0,
    },
    "Silliman": {
      name: "Silliman",
      flag: require("../../assets/images/college-logos/silliman-flag.png"),
      points: 0,
    },
    "Ezra Stiles": {
      name: "Ezra Stiles",
      flag: require("../../assets/images/college-logos/stiles-flag.png"),
      points: 0,
    },
    "Morse": {
      name: "Morse",
      flag: require("../../assets/images/college-logos/morse-flag.png"),
      points: 0,
    },
    "Branford": {
      name: "Branford",
      flag: require("../../assets/images/college-logos/branford-flag.png"),
      points: 0,
    },
    "Davenport": {
      name: "Davenport",
      flag: require("../../assets/images/college-logos/davenport-flag.png"),
      points: 0,
    },
    "Jonathan Edwards": {
      name: "Jonathan Edwards",
      flag: require("../../assets/images/college-logos/je-flag.png"),
      points: 0,
    },
    "Grace Hopper": {
      name: "Grace Hopper",
      flag: require("../../assets/images/college-logos/hopper-flag.png"),
      points: 0,
    },
    "Saybrook": {
      name: "Saybrook",
      flag: require("../../assets/images/college-logos/saybrook-flag.png"),
      points: 0,
    },
    "Trumbull": {
      name: "Trumbull",
      flag: require("../../assets/images/college-logos/trumbull-flag.png"),
      points: 0,
    },
    "Pierson": {
      name: "Pierson",
      flag: require("../../assets/images/college-logos/pierson-flag.png"),
      points: 0,
    },
  };
  return (
    <View style={styles.firstPlaceContainer}>
      <ImageBackground
        style={styles.trophy}
        source={require("../../assets/images/Trophy.png")}
      >
        <Text style={styles.firstPlaceName}>{props.firstPlace.college}</Text>
        <Image style={styles.firstPlaceFlag} source={collegesData[props.firstPlace.college].flag} />
        <Text style={styles.firstPlacePoints}>
          {props.firstPlace.score} points
        </Text>
        <Image
          source={require("../../assets/images/Calendar.png")}
          style={styles.calendarImage}
        />
      </ImageBackground>
    </View>
  );
}

export default FirstPlaceStanding;

const styles = StyleSheet.create({
    firstPlaceContainer: {
        marginTop: "3%",
        elevation: 2,
        zIndex: 2,
        height: '100%',
        width: '71%',
        alignItems: 'center',
      },
      firstPlaceFlag: {
        height: '35%',
        width: '27%',
        resizeMode: 'contain',
        marginTop: 5,
        marginRight: 20,
      },
      trophy: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginLeft: 20,
      },
      firstPlaceName: {
        color: "#3159C4",
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10,
        marginRight: 20,
      },
      firstPlacePoints: {
        color: "#3159C4",
        fontSize: 16,
        fontWeight: '700',
        marginRight: 20,
      },
      calendarImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 20,
      },
});
