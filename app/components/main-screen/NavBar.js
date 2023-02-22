import { 
  StyleSheet, Text, View, 
  TouchableOpacity, Image,
  Modal
} from 'react-native';
import { useState } from "react";


function NavBar(props) {
  const [isModalVisible, setisModalVisible] = useState(false);

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool)
  };

  if (props.color == "white") {
    return (
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={()=>{props.navigation.toggleDrawer()}}>
          <Image source={require("../../assets/images/menu-icon-white.png")} style={styles.image}/>
        </TouchableOpacity>
        <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
        <TouchableOpacity style={styles.profileButton} onPress={()=>{props.navigation.navigate('Profile')}}>
          <Image source={require("../../assets/images/profile-icon-white.png")} style={styles.image}/>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={()=>{props.navigation.toggleDrawer()}}>
          <Image source={require("../../assets/images/menu-icon-blue.png")} style={styles.image}/>
        </TouchableOpacity>
        <Text style={[styles.title, {color: props.color}]}>{props.title}</Text>
        <TouchableOpacity style={styles.profileButton} onPress={()=>{changeModalVisibility(true)}}>
          <Image source={require("../../assets/images/profile-icon-blue.png")} style={styles.image}/>
        </TouchableOpacity>
      </View> 
    )
  }
};

export default NavBar;

const styles = StyleSheet.create({
    navigationContainer: {
      top: '12%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 25,
      paddingRight: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      flex: 2,
      textAlign: 'center'
    },
    menuButton: {
      flex: 1,
    },
    profileButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    image: {
      width: 35,
      height: 35,
      resizeMode: 'contain',
    },
  });
  