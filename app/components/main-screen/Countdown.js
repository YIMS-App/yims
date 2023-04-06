import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";


function Countdown({startTime}) {
    const calculateTimeLeft = () => {
        const difference = + new Date() - +startTime;
        let timeLeft = {};
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor(difference / (1000 * 60 * 60) % 24), 
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        if (timeLeft.seconds < 10) {
          timeLeft.seconds = "0" + timeLeft.seconds
        }
        if (timeLeft.minutes < 10) {
          timeLeft.minutes = "0" + timeLeft.minutes
        }
        if (timeLeft.hours < 10) {
          timeLeft.hours = "0" + timeLeft.hours
        }
        if (timeLeft.days < 10) {
          timeLeft.days = "0" + timeLeft.days
        }
        return timeLeft;
      };
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });

    return (
        <View style={styles.countdown}>
        <View>
          <View style={styles.countdownBox}> 
              <Text style={styles.highlight}>{timeLeft.days} </Text> 
              <Text style={styles.colon}>:</Text>
          </View>
          <Text style={styles.timeLabels}>days</Text>
        </View>
        
        <View>
          <View style={styles.countdownBox}> 
              <Text style={styles.highlight}>{timeLeft.hours} </Text> 
              <Text style={styles.colon}>:</Text>
          </View>
          <Text style={styles.timeLabels}>hours</Text>
        </View>

        <View>
          <View style={styles.countdownBox}> 
              <Text style={styles.highlight}>{timeLeft.minutes} </Text> 
              <Text style={styles.colon}>:</Text>
          </View>
          <Text style={styles.timeLabels}>mins</Text>
        </View>

        <View>
          <View style={styles.countdownBox}> 
              <Text style={styles.highlight}>{timeLeft.seconds} </Text> 
          </View>
          <Text style={styles.timeLabels}>secs</Text>
        </View>
      </View>
    )
}

export default Countdown;

const styles = StyleSheet.create({
    countdown: {
        flexDirection: "row",
        marginLeft: 30,
      }, 
      countdownBox: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
        alignSelf: "center", 
      },
      highlight: {
        backgroundColor: "#3D6BE5",
        color: "white",
        margin: 5, 
        padding: 7, 
        fontWeight: "700", 
        fontSize: 40,
        width: 70,
      }, 
      colon: {
        color: "#3D6BE5", 
        fontWeight: "700", 
        fontSize: 40,
      }, 
      timeLabels: {
        color: "#3D6BE5", 
        marginRight: 20, 
        marginLeft: 20, 
      },
})