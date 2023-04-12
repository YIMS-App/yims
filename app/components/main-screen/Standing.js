import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

function Standing(props) {
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
        <View style={styles.rankContainer} testID="standing-view">
            <View style={[styles.medal, (props.collegeData.index+2> 3 ? styles.normal: (props.collegeData.index+2 == 3 ? styles.bronze : styles.silver))]}>
                <Text style={styles.medalText}>{props.collegeData.index+2}</Text>
                <Text style={styles.medalTextSuffix}>{(props.collegeData.index+2> 3 ? "th": (props.collegeData.index+2 == 3 ? "rd" : "nd"))}</Text>
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.collegeContainer}>
                    <Text style={styles.collegeName} testID="standing-college-text">{props.collegeData.item.college}</Text>
                    <Text style={styles.points} testID="standing-score-text">{props.collegeData.item.score} points</Text>
                </View>
                <Image style={styles.flag} source={collegesData[props.collegeData.item.college].flag} />
            </View>
        </View>
    )
};

export default Standing;

const styles = StyleSheet.create({
    silver: {
        backgroundColor: '#D9D9D9',
        borderColor: '#CBCBCB',
    },
    bronze: {
        backgroundColor: '#C67444',
        borderColor: '#7D3D17',
    },
    normal: {
        backgroundColor: '#ACACAC',
      },
    rankContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'row',
        width: 250,
        height: 70,
        borderRadius: 20,
        backgroundColor: 'rgba(49, 89, 196, 0.08)',
        margin: 3,
        left: 7,
        alignItems: 'center'
    },
    collegeContainer: {
        justifyContent: 'center',
        width: 200,
        height: 40,
    },
    collegeName: {
        color: '#3159C4',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
    },
    points: {
        color: '#3159C4',
        textAlign: 'center'
    },
    calendarContainer: {
        backgroundColor: 'rgba(49, 89, 196, 0.08)',
        borderRadius: 20,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medal: {
        width: 45,
        height: 45,
        borderRadius: 90,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#707070',
        flexDirection: 'row',
    },
    medalText: {
        color: '#3159C4',
        fontWeight: '700',
        fontSize: 20,
    },
    medalTextSuffix: {
        color: '#3159C4',
        fontSize: 8,
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    flag: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginTop: 4,
        marginLeft: -12,
    },
});