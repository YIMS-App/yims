import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView
} from 'react-native'
import { useState, useEffect, React } from 'react'
import ModalDropdown from '../shared/ModalDropdown'
import { IP_ADDRESS } from '../../utils/constants'

function UpdateMatch ({ visible, onSubmitData, onCancel }) {
  const [college1State, setCollege1State] = useState(null)
  const [college2State, setCollege2State] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [selectedMatchString, setSelectedMatchString] =
    useState('Select Match')
  const [matches, setMatches] = useState([])
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  const fetchUnscoredMatches = async () => {
    const resp = await fetch(IP_ADDRESS + '/getunscoredmatches')
    const matches = await resp.json()
    setMatches(matches.matches)
  }

  useEffect(() => {
    // runs once to update data at the first render
    fetchUnscoredMatches()
  }, [])

  function matchHandler (selectedMatch) {
    setSelectedMatchString(selectedMatch)
    selectedMatch = selectedMatch.split(' ')
    setSelectedMatch(
      matches.filter((match) => {
        return (
          match.college1Abbrev === selectedMatch[0] &&
          match.college2Abbrev === selectedMatch[2]
        )
      })[0]
    )
  }

  function submitDataHandler () {
    // handle potential errors by the user
    let winner = 'NONE'
    if (college1State == null || college2State == null) {
      // hasn't selected one of them
      alert('please select a result for each college.')
    } else if (college1State === college2State && college1State === 'Won') {
      alert("both colleges can't win, silly!")
    } else if (college1State === college2State && college2State === 'Lost') {
      alert("both colleges surely couldn't have lost!")
    } else {
      // valid responses
      if (college1State === 'Won') {
        winner = selectedMatch.college1
      } else if (college2State === 'Won') {
        winner = selectedMatch.college2
      } else {
        // tie
        winner = 'TIE'
      }

      onSubmitData(
        selectedMatch.college1,
        selectedMatch.college2,
        selectedMatch.sport,
        selectedMatch.startTime,
        selectedMatch.endTime,
        winner,
        selectedMatch.location
      )
    }
  }

  function cancelDataHandler () {
    // reset all of the data entry points
    setSelectedMatch(null)
    setSelectedMatchString('Select Match')
    setCollege1State(null)
    setCollege2State(null)
    onCancel()
  }

  const enterScoreCollege1 = (text) => {
    let newText = ''
    const numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i]
      } else {
        alert('Please enter numbers!')
      }
    }
    setScore1(newText)
  }

  const enterScoreCollege2 = (text) => {
    let newText = ''
    const numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i]
      } else {
        alert('Please enter numbers!')
      }
    }
    setScore2(newText)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} testID="update-match-modal">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title} testID="update-match-score-text">Score</Text>
            <TouchableOpacity onPress={() => cancelDataHandler()}>
              <Image
                source={require('../../assets/images/x-button.png')}
                style={styles.cancelButton}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.header}>Match</Text>
            <ModalDropdown
              setData={(match) => matchHandler(match)}
              options={matches.map((match) => {
                return (
                  match.college1Abbrev +
                  ' vs ' +
                  match.college2Abbrev +
                  ' (' +
                  match.startTime.split(' ')[0] +
                  '), ' +
                  match.sport
                )
              })}
              dropdownStyle={styles.matchDropdown}
              modalStyle={styles.modal}
              dropdownTextStyle={styles.matchDropdownText}
              dropdownTextHighlightStyle={styles.matchDropdownTextSelected}
              filterText={selectedMatchString}
              filterButtonStyle={styles.inputBox}
              filterTextStyle={styles.inputText}
            ></ModalDropdown>

            {/* {<ModalDropdown
              showsVerticalScrollIndicator={true}
              defaultValue={"Select Match"}
              onSelect={(idx, match) => matchHandler(match)}
              renderRightComponent={() => {
                return (
                  <Image
                    source={require("../../assets/images/down-arrow2.png")}
                    style={styles.whiteDropDownArrow}
                  />
                );
              }}
            />} */}
          </View>
          {selectedMatch
            ? (
            <View>
              <View style={styles.dropdownContainer}>
                <Text style={styles.header}>Enter Final Scores</Text>

                <SafeAreaView style={styles.enterScore}>
                  <Text style={styles.collegeText}>{selectedMatch.college1}:</Text>
                  <TextInput
                      keyboardType='numeric'
                      onChangeText={text => enterScoreCollege1(text)}
                      value={score1}
                      style={styles.input}
                      placeholder='0'
                      maxLength={10}
                  />
                </SafeAreaView>
              </View>
              <View style={styles.dropdownContainer}>
                <SafeAreaView style={styles.enterScore}>
                  <Text style={styles.collegeText}>{selectedMatch.college2}:</Text>
                  <TextInput
                      keyboardType='numeric'
                      onChangeText={text => enterScoreCollege2(text)}
                      value={score2}
                      style={styles.input}
                      placeholder='0'
                      maxLength={10}
                  />
                </SafeAreaView>
              </View>
              <TouchableOpacity
                onPress={submitDataHandler}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
              )
            : null}
        </View>
      </View>
    </Modal>
  )
}

export default UpdateMatch

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: '90%',
    backgroundColor: '#3159C4',
    alignSelf: 'center',
    borderRadius: 50,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 15,
    paddingLeft: 15
  },
  headerContainer: {
    flexDirection: 'row',
    marginLeft: 10
  },
  title: {
    color: 'white',
    fontWeight: '300',
    fontSize: 30,
    flex: 3,
    paddingTop: 10,
    marginLeft: 5
  },
  cancelButton: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    flex: 1,
    marginRight: 5,
    marginTop: 2
  },
  dropdownContainer: {
    marginLeft: 10
  },
  header: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 3,
    marginLeft: 5,
    marginTop: 3
  },
  collegeText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 22,
    marginBottom: 3,
    marginLeft: 16,
    marginTop: 3
  },
  inputBox: {
    width: 300,
    height: 66,
    backgroundColor: '#3159C4',
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'white'
  },
  inputText: {
    color: 'white',
    textAlignVertical: 'center',
    marginLeft: 10,
    fontSize: 25,
    fontWeight: '300'
  },
  matchDropdown: {
    borderRadius: 20
  },
  modal: {
    alignSelf: 'center',
    height: '30%',
    marginTop: 450,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 35
  },
  matchDropdownText: {
    color: '#3159C4',
    fontSize: 25,
    fontWeight: '300',
    marginLeft: 15,
    marginTop: 10
  },
  matchDropdownTextSelected: {
    backgroundColor: '#7195F6',
    fontSize: 25,
    fontWeight: '300',
    marginLeft: 15,
    marginTop: 10,
    color: 'white'
  },
  whiteDropDownArrow: {
    position: 'absolute',
    right: 10,
    width: 31,
    height: 30,
    resizeMode: 'contain'
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 75,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
    padding: 5
  },
  addButtonText: {
    color: '#3159C4',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  enterScore: {
    flexDirection: 'row',
    margin: 10
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 30,
    width: 40,
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#3159C4'
  }
})
