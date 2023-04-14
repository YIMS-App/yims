import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from "react-native";

import {WebView} from "react-native-webview";
import { useState } from "react";
import { IP_ADDRESS } from "../utils/constants";

export default function LoginScreen({ navigation }) {
  const [modalIsVisible, setModalVisibility] = useState(false);

  function startCASLoginHandler() {
    setModalVisibility(true);
  }

  function endCASLoginHandler() {
    setModalVisibility(false);
  }

  function CASLoginHandler(data) {
    if (data["username"]){

      const username = data["username"]
      
      const login = async (params) => {
        const response = await fetch(IP_ADDRESS + '/userperms', {
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userid: params["username"]
            
          })
        });
        const data = await response.json();
        data.username = JSON.stringify(username);
        navigation.navigate("Home", data);
      };
      login(data);
      endCASLoginHandler()
    }
    else{
      console.log("e");
    }

  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => startCASLoginHandler()}
      >
        <Text style={styles.loginText}>
          Login with your Yale CAS information
        </Text>
      </TouchableOpacity>
      <CASModal
        visible={modalIsVisible}
        onLogin={CASLoginHandler}
      />
    </View>
  );
}

function CASModal ({visible, onLogin}) {

  const login = async (params) => {
    const response = await fetch(IP_ADDRESS + '/casauth', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticket: params["ticket"]
      })
    });
    const data = await response.json();
    onLogin(data)
  };

  return (
    <Modal visible={visible}>
      <WebView source={{ uri: 'https://secure.its.yale.edu/cas/login?service=https://google.com'}}
        onNavigationStateChange={(navState) => {
          // Keep track of going back navigation within component
          var regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
          while (match = regex.exec(navState.url)) {
            params[match[1]] = match[2];
          }
          if ("ticket" in params){
            login(params);      
          }
            
        }}/>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3159C4",
    zIndex: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#3159C4",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 25,
    padding: 30,
  },
  loginContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
