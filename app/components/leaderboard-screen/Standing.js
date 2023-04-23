import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import assets from '../../assets'
import PropTypes from 'prop-types'

export default function Standing ({ type, collegeData }) {
  return (
        <View style={styles.rankContainer} testID="standing-view">
            <View style={[styles.medal, (collegeData.index + 2 > 3 ? styles.normal : (collegeData.index + 2 === 3 ? styles.bronze : styles.silver))]}>
                <Text style={styles.medalText}>{collegeData.index + 2}</Text>
                <Text style={styles.medalTextSuffix}>{(collegeData.index + 2 > 3 ? 'th' : (collegeData.index + 2 === 3 ? 'rd' : 'nd'))}</Text>
            </View>   
            {type === 'points'
              ? (
                <View style={styles.rowContainer}>
                  <View style={styles.collegeContainer}>
                    <Text style={styles.collegeName} testID="standing-college-text">{collegeData.item.college}</Text>
                    <Text style={styles.points} testID="standing-score-text">{collegeData.item.score} points</Text>
                  </View>
                  <Image style={styles.flag} source={assets.collegeFlags[collegeData.item.college].flag} />
                </View>
                )
              : (
                <View style={styles.partRowContainer}>
                  <View style={styles.collegeContainer}>
                    <Text style={styles.partCollegeName} testID="standing-college-text">{collegeData.item.college}</Text>
                    <Text style={styles.partpoints} testID="standing-score-text">{collegeData.item.partScore} points</Text>
                  </View>
                  <Image style={styles.flag} source={assets.collegeFlags[collegeData.item.college].flag} />
                </View>
              )}

            {type === 'points'
            ? (
              <View style={styles.calendarContainer}>
                <Image source={require('../../assets/images/calendar-blue.png')} style={styles.image}/>
              </View>
              )
            : (
              <View style={styles.partCalendarContainer}>
                <Image source={require('../../assets/images/calendar-white.png')} style={styles.image}/>
              </View>
              )}
        </View>
  )
};

Standing.propTypes = {
  type: PropTypes.string,
  collegeData: PropTypes.object
}

const styles = StyleSheet.create({
  silver: {
    backgroundColor: '#D9D9D9',
    borderColor: '#CBCBCB'
  },
  bronze: {
    backgroundColor: '#C67444',
    borderColor: '#7D3D17'
  },
  normal: {
    backgroundColor: '#ACACAC'
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    width: 230,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'rgba(49, 89, 196, 0.08)',
    margin: 3,
    alignItems: 'center'
  },
  partRowContainer: {
    flexDirection: 'row',
    width: 230,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    margin: 3,
    alignItems: 'center'
  },
  collegeContainer: {
    justifyContent: 'center',
    width: 200,
    height: 40
  },
  collegeName: {
    color: '#3159C4',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
  },
  partCollegeName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
  },
  points: {
    color: '#3159C4',
    textAlign: 'center'
  },
  partpoints: {
    color: 'white',
    textAlign: 'center'
  },
  calendarContainer: {
    backgroundColor: 'rgba(49, 89, 196, 0.08)',
    borderRadius: 20,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  partCalendarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  medal: {
    width: 45,
    height: 45,
    borderRadius: 90,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#707070',
    flexDirection: 'row'
  },
  medalText: {
    color: '#3159C4',
    fontWeight: '700',
    fontSize: 20
  },
  medalTextSuffix: {
    color: '#3159C4',
    fontSize: 8
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  flag: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginTop: 4,
    marginLeft: -12
  }
})
