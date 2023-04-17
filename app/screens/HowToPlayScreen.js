import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import EmojiGuide from '../components/howtoplay-screen/EmojiGuide';
import NavBar from '../components/shared/NavBar';
import OpenURLButton from '../components/shared/OpenURLButton';
import PropTypes from 'prop-types';

export default function HowToPlayScreen(props) {
  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} title={'How To Play'} color={'white'} params={props.params} />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.linecontainer}>
          <View style={styles.line} />
          <View>
            <Text style={[styles.title, { marginTop: '20%' }]}>Overview</Text>
          </View>
          <View style={styles.line} />
        </View>

        <Text style={[styles.title2, { marginTop: '5%' }]}>What are Intramural Sports?</Text>
        <Text style={styles.body}>
          Every year Yale’s 14 colleges compete in various intramural sports. The college with the most points at the
          end of Spring Semester wins the famous Tyng Cup.{' '}
        </Text>
        <Text style={[styles.title2]}>How are points tallied?</Text>
        <View style={styles.link}>
          <OpenURLButton url={'https://intramurals.yale.edu/tyng-cup-point-system'}>
            <Text style={styles.body}>Read about the Tyng Cup Point System here.</Text>
          </OpenURLButton>
        </View>

        <View style={styles.linecontainer}>
          <View style={styles.line} />
          <View>
            <Text style={[styles.title, { marginTop: '10%' }]}>Sport Point Values</Text>
          </View>
          <View style={styles.line} />
        </View>

        <EmojiGuide />

        <View style={styles.emptyspace}></View>
      </ScrollView>
    </View>
  );
}

HowToPlayScreen.propTypes = {
  navigation: PropTypes.object,
  params: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D6BE5',
    flex: 1,
  },
  scrollContainer: {
    marginLeft: 5,
    marginRight: 3,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 50,
  },
  linecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'white',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  sport: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    marginLeft: 25,
    marginRight: 25,
  },
  body: {
    fontSize: 15,
    fontWeight: '300',
    color: 'white',
    margin: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  title2: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  link: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    margin: 15,
    marginLeft: 25,
    marginRight: 25,
    padding: 10,
  },
  emptyspace: {
    height: 100,
  },
});
