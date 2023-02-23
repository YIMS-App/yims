import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { useState } from "react";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ModalDropdown = (props) => {

  const [isModalVisible, setisModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  const onPressItem = (option) => {
    setSelectedItem(option);
    changeModalVisibility(false);
    props.setData(option);
  };

  const options = props.options.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={props.dropdownStyle}
        onPress={() => onPressItem(item)}
      >
        <Text
          style={
            props.dropdownTextStyle /*selectedItem == item && props.dropdownTextHighlightStyle ? props.dropdownTextHighlightStyle : props.dropdownTextStyle*/
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView testID="modal-dropdown-view">
      <TouchableOpacity
        onPress={() => changeModalVisibility(true)}
        style={props.filterButtonStyle}
      >
        <Text style={props.filterTextStyle}>{props.filterText}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <TouchableOpacity onPress={() => changeModalVisibility(false)}>
          <View style={props.modalStyle}>
            <ScrollView>{options}</ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

/*dropdownStyle={styles.matchDropdown}
              dropdownTextStyle={styles.matchDropdownText}
              dropdownTextHighlightStyle={styles.matchDropdownTextSelected}
              */

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#DFE5F2",
    borderRadius: 20,
  },
});

export { ModalDropdown };
