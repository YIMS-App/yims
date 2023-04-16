import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity
  } from "react-native";

  import QRCode from 'react-native-qrcode-svg'


  export default function QRCodeModal(props) {
    
    function cancelDataHandler() {
      props.onCancel();
    };

    return (
        <Modal visible={props.visible}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => cancelDataHandler()}>
                <Image
                  source={require("../assets/images/x-button.png")}
                  style={styles.cancelButton}
              />
              </TouchableOpacity>
            </View>
            <View style={styles.inner}>
              <Text style={styles.title}>Scan QR Code to </Text>
              <Text style={styles.title}>earn attendance points</Text>
              <QRCode
                  value={"exp://172.27.112.229:19000/--/userqrcode?matchId="+props.matchId}
                  size={250}
              />
              <Text style={[styles.title, {marginTop: 10}]}>Thanks for coming!</Text>
            </View>
          </View>
        </Modal>
    );
  };

  const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#3D6BE5',
        flex: 1,
    },
    headerContainer: {
      padding: 15,
      flexDirection: "row",
      justifyContent: 'flex-end',
    },
    inner:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20%',
    },
    title: {
      fontSize: 30,
      color: 'white',
      marginBottom: 10,
    },
    cancelButton: {
      width: 75,
      height: 75,
      resizeMode: "contain",
      marginRight: 5,
      marginTop: '30%',
    },
});

