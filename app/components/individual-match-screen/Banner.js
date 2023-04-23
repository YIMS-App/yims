import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Flag from '../shared/Flag'
import PropTypes from 'prop-types'
import { SPORTS_MAPPING } from '../../utils/constants'

export default function Banner ({ match, bettingOver }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.date}>{match.date}</Text>
      <View style={styles.info}>
        <View style={styles.college}>
          <Flag college={match.college1} />
          <Text style={styles.collegeText}>{match.college1}</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.score}>
            {
              bettingOver ? match.score1 + '-' + match.score2 : '--'
            }
          </Text>
          <Text style={styles.emoji}>{SPORTS_MAPPING[match.sport].emoji}</Text>
        </View>
        <View style={styles.college}>
          <Flag college={match.college2} />
          <Text style={styles.collegeText}>{match.college2}</Text>
        </View>
      </View>
    </View>
  )
}

Banner.propTypes = {
  match: PropTypes.object,
  bettingOver: PropTypes.bool
}

const styles = StyleSheet.create({
  banner: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#3D6BE5',
    padding: 20
  },
  whitespace: {
    height: 25
  },
  date: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  },
  info: {
    flexDirection: 'row'
  },
  score: {
    color: 'white',
    fontWeight: '700',
    fontSize: 70,
    alignSelf: 'center'
  },
  college: {
    marginLeft: 7,
    marginRight: 7,
    flexDirection: 'column',
    alignItems: 'center',
    width: 100
  },
  collegeText: {
    color: 'white',
    fontWeight: '700',
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center'
  },
  middle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 35
  }
})
