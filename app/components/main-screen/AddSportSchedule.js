import {StyleSheet, View, Modal, Text, TouchableOpacity, Image} from 'react-native'
import {useState} from 'react'
import ModalDropdown from 'react-native-modal-dropdown';

function AddSportSchedule(props) {
    const sports = ['soccer', 'flag football', 'cornhole', 'ping pong', 'spikeball', 'pickleball', 'basketball', 'dodgeball', 'volleyball', 'soccer (indoors)', 'broomball', 'water polo'];
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    const days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21', '22', '23', '24','25', '26', '27', '28', '29', '30', '31']
    const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']
    const [sport, setSport] = useState(null);    
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null);

    function sportHandler(sport) {
        setSport(sport);
    };

    function submitDataHandler() {
        // error handling
        if(sport == null || month == null || day == null || year == null) {
            alert("please select each of the required fields.")
        } else {
            // TODO: write this handler once data handler for whatever is calling this component is defined

            // hardcoded times: could change, but for this function time should not be necessary
            // const startDate = (new Date(Number(year), Number(month) - 1, Number(day), Number(0), Number(0))).toISOString().slice(0, 19).replace('T', ' ');
            // const endDate = (new Date(Number(year), Number(month) - 1, Number(day), Number(0), Number(0))).toISOString().slice(0, 19).replace('T', ' ');
            // props.onSubmitData(college1, college2, sport, startDate, endDate, "NONE", location);

            // reset all data entry points
            setSport(null)
            setMonth(null)
            setDay(null)
            setYear(null)
        }
    };

    function cancelDataHandler() {
        // reset all data entry points & dismiss the modal
        setSport(null)
        setMonth(null)
        setDay(null)
        setYear(null)
        
        // TODO: uncomment this out once oncancel for whatever is calling this component is defined
        // props.onCancel();
    };

    return (
        <Modal visible={props.visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>Add Available Date</Text>
                        <TouchableOpacity onPress={() => cancelDataHandler()}>
                            <Image source={require("../../assets/images/x-button.png")} style={styles.cancelButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.header}>Date</Text>
                            <View style={styles.dateContainer}>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subheader}>Month</Text>
                                    <ModalDropdown
                                        textStyle={styles.dateText}
                                        style={styles.dateBox}
                                        dropdownTextStyle={styles.dateTimeText}
                                        isFullWidth={true}
                                        options={months}
                                        defaultValue={''}
                                        onSelect={(idx, month) => setMonth(month)}
                                        renderRightComponent={() => {
                                            return (
                                                <Image source={require("../../assets/images/blue-down-arrow.png")} style={styles.blueDropDownArrow}/>
                                            );
                                          }}
                                    />
                                </View>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subheader}>Day</Text>
                                    <ModalDropdown
                                        textStyle={styles.dateText}
                                        style={styles.dateBox}
                                        dropdownTextStyle={styles.dateTimeText}
                                        isFullWidth={true}
                                        options={days}
                                        defaultValue={''}
                                        onSelect={(idx, day) => setDay(day)}
                                        renderRightComponent={() => {
                                            return (
                                                <Image source={require("../../assets/images/blue-down-arrow.png")} style={styles.blueDropDownArrow}/>
                                            );
                                          }}
                                    />
                                </View>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subheader}>Year</Text>
                                    <ModalDropdown
                                        textStyle={styles.dateText}
                                        style={styles.dateBox}
                                        dropdownTextStyle={[styles.dateTimeText, {paddingRight: 45,}]}
                                        isFullWidth={true}
                                        options={years}
                                        defaultValue={''}
                                        onSelect={(idx, year) => setYear(year)}
                                        renderRightComponent={() => {
                                            return (
                                                <Image source={require("../../assets/images/blue-down-arrow.png")} style={styles.blueDropDownArrow}/>
                                            );
                                          }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.header}>Sport</Text>
                            <ModalDropdown
                                textStyle={styles.inputText}
                                style={styles.inputBox}
                                dropdownStyle={styles.collegeDropdown}
                                dropdownTextStyle={styles.collegeDropdownText}
                                dropdownTextHighlightStyle={styles.collegeDropdownTextSelected}
                                showsVerticalScrollIndicator={true}
                                isFullWidth={true}
                                options={sports}
                                defaultValue={'Select Sport'}
                                onSelect={(idx, sport) => sportHandler(sport)}
                                renderRightComponent={() => {
                                    return (
                                        <Image source={require("../../assets/images/down-arrow.png")} style={styles.whiteDropDownArrow}/>
                                    );
                                  }}
                           />
                        </View>
                    </View>
                    <TouchableOpacity onPress={submitDataHandler} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Date</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export default AddSportSchedule;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#3159C4',
        alignSelf: 'center',
        borderRadius: 50,
        paddingTop: 15,
        paddingBottom: 30,
        paddingRight: 10,
        paddingLeft: 10,
    },
    headerContainer: {
        padding: 15,
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        fontWeight: '400',
        fontSize: 30,
        flex: 3,
        padding: 10,
        marginLeft: 5,
    },
    cancelButton: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        flex: 1,
        marginRight: 5,
        marginTop: 2,
      },
    formContainer: {
        flexDirection: 'column',
    },
    dropdownContainer: {
        flexDirection: 'column',
    },
    header: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 2,
    },
    dateContainer: {
        flexDirection: 'row',
    },
    timeContainer: {
        flexDirection: 'row',
    },
    inputBox: {
        width: 300,
        height: 66,
        backgroundColor: '#3159C4',
        marginBottom: 10,
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'white',
      },
      inputText: {
        color: 'white',
        textAlignVertical: 'center',
        marginLeft: 10,
        fontSize: 25,
        fontWeight: '300'
      },
      dateText: {
        color: '#3159C4',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        padding: 3,
      },
      dateBox: {
        backgroundColor: 'white',
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 5,
        height: 30,
      },
      subheader: {
        color: 'white',
      },
      subContainer: {
        flex: 1,
      },
      addButton: {
        backgroundColor: "white",
        borderRadius: 5,
      },
      addButtonText: {
        color: "#3159C4",
        padding: 8,
        fontWeight: '700',
        fontSize: 20,
      },
      collegeDropdown: {
        borderRadius: 8,
      },
      collegeDropdownText: {
        color: '#3159C4',
        fontSize: 25,
        fontWeight: '300',
        marginLeft: 5,
      },
      collegeDropdownTextSelected: {
        backgroundColor: '#7195F6',
        fontSize: 25,
        fontWeight: '300',
        marginLeft: 5,
        color: "white",
    },
      dateTimeText: {
        color: '#3159C4',
        fontSize: 14,
        fontWeight: '300',
        marginLeft: 5,
      },
      line: {
        borderWidth: 2,
        height: 1,
        width: 15,
        borderColor: '#D9D9D9',
        borderRadius: 4,
        alignSelf: 'center',
        marginRight: 8,
      },
      blueDropDownArrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        position: 'absolute',
        top: 8,
        right: 10,
      },
      whiteDropDownArrow: {
        position: 'absolute',
        right: 10,
        width: 25,
        height: 25,
        resizeMode: 'contain',
      } 
});