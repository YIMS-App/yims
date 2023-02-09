import {StyleSheet, View, Modal, Text, TouchableOpacity, Image} from 'react-native'
import {useState} from 'react'
import ModalDropdown from 'react-native-modal-dropdown';

function AddMatch(props) {
    const sports = ['soccer', 'flag football', 'cornhole', 'ping pong', 'spikeball', 'pickleball', 'basketball', 'dodgeball', 'volleyball', 'soccer (indoors)'];
    const colleges = ['Benjamin Franklin', 'Berkeley',  'Branford','Davenport', "Ezra Stiles", 'Grace Hopper', 'Jonathan Edwards', 
                    'Morse', 'Pauli Murray', 'Pierson', 'Silliman', 'Saybrook', 'Trumbull', 'Timothy Dwight'] 
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
    const days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21', '22', '23', '24','25', '26', '27', '28', '29', '30', '31']
    const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015']
    const times = ['1:00','1:15','1:30','1:45',
                '2:00','2:15','2:30','2:45',
                '3:00','3:15','3:30','3:45',
                '4:00','4:15','4:30','4:45',
                '5:00','5:15','5:30','5:45',
                '6:00','6:15','6:30','6:45',
                '7:00','7:15','7:30','7:45',
                '8:00','8:15','8:30','8:45',
                '9:00','9:15','9:30','9:45',
                '10:00','10:15','10:30','10:45',
                '11:00','11:15','11:30','11:45',]
    const locations = ['Lanman Center', 'Fields @ Tsai Stop', 'PWG Crescent', 'Room H (PWG Floor 5)', 'Room K (PWG Floor 5)'];
    // in the future, add google maps direct link for locations ? 
    const [college1, setCollege1] = useState(null);
    const [college2, setCollege2] = useState(null);
    const [sport, setSport] = useState(null);    
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [year, setYear] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [location, setLocation] = useState(null);

    function college1Handler(college) {
        setCollege1(college);
    };

    function college2Handler(college) {
        setCollege2(college);
    };

    function sportHandler(sport) {
        setSport(sport);
    };

    function submitDataHandler() {
        // error handling
        if(college1 == null || college2 == null || sport == null || month == null || day == null || year == null || startTime == null || endTime == null || location == null) {
            alert("please select each of the required fields.")
        } else if(college1 == college2) {
            alert("a college can't play itself!")
        } else {
            const startarray = startTime.split(':')
            const endarray = endTime.split(':')
            times.push(...endTime.split(':'))
            //-5 is used to offset timezone from UTC and +12 is for P.M. (since there are no IMs in the morning). The -1s are for 0 indexed values
            const startDate = (new Date(Number(year), Number(month) - 1, Number(day), Number(startarray[0] - 5 + 12), Number(startarray[1]))).toISOString().slice(0, 19).replace('T', ' ');
            const endDate = (new Date(Number(year), Number(month) - 1, Number(day), Number(endarray[0] - 5 + 12), Number(endarray[1]))).toISOString().slice(0, 19).replace('T', ' ');
            props.onSubmitData(college1, college2, sport, startDate, endDate, "NONE", location);

            // reset all data entry points
            setCollege1(null)
            setCollege2(null)
            setSport(null)
            setMonth(null)
            setDay(null)
            setYear(null)
            setStartTime(null)
            setEndTime(null)
            setLocation(null)
        }
    };

    function cancelDataHandler() {
        // reset all data entry points & dismiss the modal
        setCollege1(null)
        setCollege2(null)
        setSport(null)
        setMonth(null)
        setDay(null)
        setYear(null)
        setStartTime(null)
        setEndTime(null)
        setLocation(null)
        
        props.onCancel();
    };

    return (
        <Modal visible={props.visible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>New Match</Text>
                        <TouchableOpacity onPress={() => cancelDataHandler()}>
                            <Image source={require("../../assets/images/x-button.png")} style={styles.cancelButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.header}>College 1</Text>
                            <ModalDropdown
                                textStyle={styles.inputText}
                                style={styles.inputBox}
                                dropdownStyle={styles.collegeDropdown}
                                dropdownTextStyle={styles.collegeDropdownText}
                                dropdownTextHighlightStyle={styles.collegeDropdownTextSelected}
                                showsVerticalScrollIndicator={true}
                                isFullWidth={true}
                                options={colleges}
                                defaultValue={'Select College'}
                                onSelect={(idx, college) => college1Handler(college)}
                                renderRightComponent={() => {
                                    return (
                                        <Image source={require("../../assets/images/down-arrow.png")} style={styles.whiteDropDownArrow}/>
                                    );
                                  }}
                            />
                        </View>
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.header}>College 2</Text>
                            <ModalDropdown
                                textStyle={styles.inputText}
                                style={styles.inputBox}
                                dropdownStyle={styles.collegeDropdown}
                                dropdownTextStyle={styles.collegeDropdownText}
                                dropdownTextHighlightStyle={styles.collegeDropdownTextSelected}
                                showsVerticalScrollIndicator={true}
                                isFullWidth={true}
                                options={colleges}
                                defaultValue={'Select College'}
                                onSelect={(idx, college) => college2Handler(college)}
                                renderRightComponent={() => {
                                    return (
                                        <Image source={require("../../assets/images/down-arrow.png")} style={styles.whiteDropDownArrow}/>
                                    );
                                  }}
                            />
                        </View>
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
                            <View style={styles.timeContainer}>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subheader}>Start time</Text>
                                    <ModalDropdown
                                        textStyle={styles.dateText}
                                        style={styles.dateBox}
                                        dropdownTextStyle={styles.dateTimeText}
                                        isFullWidth={true}
                                        options={times}
                                        defaultValue={''}
                                        onSelect={(idx, startTime) => {setStartTime(startTime); console.log(startTime)}}
                                        renderRightComponent={() => {
                                            return (
                                                <Image source={require("../../assets/images/blue-down-arrow.png")} style={styles.blueDropDownArrow}/>
                                            );
                                          }}
                                    />
                                </View>
                                <View style={styles.line}></View>
                                <View style={styles.subContainer}>
                                    <Text style={styles.subheader}>End time</Text>
                                    <ModalDropdown
                                        textStyle={styles.dateText}
                                        style={styles.dateBox}
                                        dropdownTextStyle={[styles.dateTimeText, {paddingRight: 80,}]}
                                        isFullWidth={true}
                                        options={times}
                                        defaultValue={''}
                                        onSelect={(idx, endTime) => setEndTime(endTime)}
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
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.header}>Location</Text>
                            <ModalDropdown
                                textStyle={styles.inputText}
                                style={styles.inputBox}
                                dropdownStyle={styles.collegeDropdown}
                                dropdownTextStyle={styles.collegeDropdownText}
                                dropdownTextHighlightStyle={styles.collegeDropdownTextSelected}
                                showsVerticalScrollIndicator={true}
                                isFullWidth={true}
                                options={locations}
                                defaultValue={'Select Location'}
                                onSelect={(idx, location) => setLocation(location)}
                                renderRightComponent={() => {
                                    return (
                                        <Image source={require("../../assets/images/down-arrow.png")} style={styles.whiteDropDownArrow}/>
                                    );
                                  }}
                           />
                        </View>
                    </View>
                    <TouchableOpacity onPress={submitDataHandler} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add Match</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export default AddMatch;

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