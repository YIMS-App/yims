import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import assets from '../../assets'

export default function Flag ({ college }) {
  return (
        <View>
            <Image source={assets.collegeFlags[college].flag} style={styles.flag}/>
        </View>
  )
};

Flag.propTypes = {
  college: PropTypes.string
}

const styles = StyleSheet.create({
  flag: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    marginTop: 15,
    flexDirection: 'column',
    alignSelf: 'center'
  }
})
