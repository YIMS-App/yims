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
import LottieView from 'lottie-react-native';
import assets from "../assets";

export default function UserQRCodeScreen(props) {
    // make backend call updating user points values and attendance numbers for this match upon opening this screen

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Great Job! You've earned X attendance points. </Text>
            <LottieView source={assets.lottieFiles.coin} autoPlay loop style={styles.animationContainer}/>
            <TouchableOpacity 
                style={styles.doneButton}
                onPress={() => props.navigation.navigate("Leaderboard")}>
                <Text style={styles.blueText}>done</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#3D6BE5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationContainer: {
        width: 200,
        height: 200,
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    blueText: {
        color: '#3D6BE5',
        fontSize: 20,
        textAlign: 'center',
    },
    doneButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
    }
});


