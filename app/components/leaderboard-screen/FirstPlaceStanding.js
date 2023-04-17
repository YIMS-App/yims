import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from "react-native";
import assets from "../../assets";

function FirstPlaceStanding(props) {

  return (
    <View style={styles.firstPlaceContainer} testID="first-place-standing-view">
      <ImageBackground
        style={styles.trophy}
        source={require("../../assets/images/trophy-icon.png")}
      >
        <Text style={styles.firstPlaceName} testID="first-place-standing-college">{props.firstPlace.college}</Text>
        <Image style={styles.firstPlaceFlag} source={assets.collegeFlags[props.firstPlace.college].flag} />
        <Text style={styles.firstPlacePoints} testID="first-place-standing-points">
          {props.firstPlace.score} points
        </Text>
        <Image
          source={require("../../assets/images/calendar-icon.png")}
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
