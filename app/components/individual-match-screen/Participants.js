import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default function Participants ({ participants }) {
  const participantsList = []

  for (let i = 0; i < participants.length; i++) {
    participantsList.push(
            <View style={styles.circle} key={participants[i]}>
                <Text style={styles.circleText}t>
                    {participants[i]}
                </Text>
            </View>
    )
  }
  return (
        <View style={styles.container}>
            {participantsList}
        </View>
  )
}

Participants.propTypes = {
  participants: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3D6BE5',
    margin: 5,
    borderColor: '#1A3B93',
    borderWidth: 3
  },
  circleText: {
    color: 'white',
    paddingLeft: 9,
    paddingTop: 12,
    fontWeight: '700',
    fontSize: 25
  }

})
