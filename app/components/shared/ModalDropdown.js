import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal
} from 'react-native'
import PropTypes from 'prop-types'

export default function ModalDropdown ({ setData, options, dropdownStyle, dropdownTextStyle, filterButtonStyle, filterTextStyle, filterText, modalStyle }) {
  const [isModalVisible, setisModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool)
  }

  const onPressItem = (option) => {
    setSelectedItem(option)
    changeModalVisibility(false)
    setData(option)
  }

  const choices = options.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={dropdownStyle}
        onPress={() => onPressItem(item)}
      >
        <Text
          style={
            dropdownTextStyle /* selectedItem == item && dropdownTextHighlightStyle ? dropdownTextHighlightStyle : dropdownTextStyle */
          }
        >
          {item}
        </Text>
      </TouchableOpacity>
    )
  })

  return (
    <SafeAreaView testID="modal-dropdown-view">
      <TouchableOpacity
        onPress={() => changeModalVisibility(true)}
        style={filterButtonStyle}
      >
        <Text style={filterTextStyle}>{filterText}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisibility(false)}
      >
        <TouchableOpacity onPress={() => changeModalVisibility(false)}>
          <View style={modalStyle}>
            <ScrollView>{choices}</ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

ModalDropdown.propTypes = {
  setData: PropTypes.func,
  options: PropTypes.array,
  dropdownStyle: PropTypes.object,
  dropdownTextStyle: PropTypes.object,
  filterButtonStyle: PropTypes.object,
  filterTextStyle: PropTypes.object,
  filterText: PropTypes.string,
  modalStyle: PropTypes.object
}
