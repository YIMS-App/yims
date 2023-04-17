import { Text, View, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

export default function OpenURLButton ({ url, children, buttonStyle }) {
  // pasted from expo docs
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }, [url])

  return (
      <TouchableOpacity title={children} onPress={handlePress}>
        <View style={buttonStyle}>
          <Text>{children}</Text>
        </View>
      </TouchableOpacity>
  )
}

OpenURLButton.propTypes = {
  url: PropTypes.string,
  children: PropTypes.object,
  buttonStyle: PropTypes.object
}
