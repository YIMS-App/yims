import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

function Flags(props) {
    const collegesData = {
        "Benjamin Franklin": {
          name: "Benjamin Franklin",
          flag: require("../assets/images/college-logos/franklin-flag.png"),
          points: 0,
        },
        "Berkeley": {
          name: "Berkeley",
          flag: require("../assets/images/college-logos/berkeley-flag.png"),
          points: 0,
        },
        "Pauli Murray": {
          name: "Pauli Murray",
          flag: require("../assets/images/college-logos/murray-flag.png"),
          points: 0,
        },
        "Timothy Dwight": {
          name: "Timothy Dwight",
          flag: require("../assets/images/college-logos/td-flag.png"),
          points: 0,
        },
        "Silliman": {
          name: "Silliman",
          flag: require("../assets/images/college-logos/silliman-flag.png"),
          points: 0,
        },
        "Ezra Stiles": {
          name: "Ezra Stiles",
          flag: require("../assets/images/college-logos/stiles-flag.png"),
          points: 0,
        },
        "Morse": {
          name: "Morse",
          flag: require("../assets/images/college-logos/morse-flag.png"),
          points: 0,
        },
        "Branford": {
          name: "Branford",
          flag: require("../assets/images/college-logos/branford-flag.png"),
          points: 0,
        },
        "Davenport": {
          name: "Davenport",
          flag: require("../assets/images/college-logos/davenport-flag.png"),
          points: 0,
        },
        "Jonathan Edwards": {
          name: "Jonathan Edwards",
          flag: require("../assets/images/college-logos/je-flag.png"),
          points: 0,
        },
        "Grace Hopper": {
          name: "Grace Hopper",
          flag: require("../assets/images/college-logos/hopper-flag.png"),
          points: 0,
        },
        "Saybrook": {
          name: "Saybrook",
          flag: require("../assets/images/college-logos/saybrook-flag.png"),
          points: 0,
        },
        "Trumbull": {
          name: "Trumbull",
          flag: require("../assets/images/college-logos/trumbull-flag.png"),
          points: 0,
        },
        "Pierson": {
          name: "Pierson",
          flag: require("../assets/images/college-logos/pierson-flag.png"),
          points: 0,
        },
      };

    return (
        <View>
            <Image source={collegesData[props.college].flag} style={styles.flag}/>
        </View>
    )
};

export default Flags;

const styles = StyleSheet.create({
  flag: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginTop: 15,
    flexDirection: 'column',
    alignSelf: 'center'
  },
});