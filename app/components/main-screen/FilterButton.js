
import React, {} from "react";
import {
	View,
	Text,
	StyleSheet,
    Modal,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { ModalPicker } from '../shared/ModalPicker';
import { useState, useEffect } from "react";


function FilterButton(props) {
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchMatchesScores();
	  }, []);
  
	const handleSelectedMatch = (match) => {
	if(selectedMatch == match)
		setSelectedMatch('');
	else
		setSelectedMatch(match);
	};

	const changeModalVisibility = (bool) => {
	setisModalVisible(bool)
	};

	const fetchMatchesScores = async () => {
	Promise.all([
		fetch(IP_ADDRESS + "/getfuturematches"),
		fetch(IP_ADDRESS + "/getallsportscores"),
	])
		.then(([resMatches, resSports]) =>
		Promise.all([resMatches.json(), resSports.json()])
		)
		.then(([matchesData, sportsData]) => {
		setMatches(matchesData["matches"]);
		setfilterMatches(matchesData["matches"]);
		setSports(sportsData);
		setLoading(false);
		})
	setRefreshing(false);
	}
    useEffect(() => { // runs once to update data at the first render
      fetchMatchesScores();
    }, []); 
	
	const [filterText, setFilterText] = useState('All Colleges');
	const [isModalVisible, setisModalVisible] = useState(false);
	const [filterMatches, setfilterMatches] = useState([]);


	const setData = (college) => {
		setFilterText(college)
		if (college != 'All Colleges') {
		  setfilterMatches(matches.filter(function (match) {
			if (match.college1 == college || match.college2 == college) {
			  return match;
			}
		  }))
		} else {
		  setfilterMatches(matches);
		}
	  }

	return (
		<View style={styles.headerContainer}>
			<SafeAreaView>
				<TouchableOpacity
					onPress={() => changeModalVisibility(true)}
					style={styles.filterButton}
				>
					<Text style={styles.filterText}>{filterText}</Text>
				</TouchableOpacity>
				<Modal
					transparent={true}
					animationType='fade'
					visible={isModalVisible}
					nRequestClose={() => changeModalVisibility(false)}
				>
					<ModalPicker 
					changeModalVisibility={changeModalVisibility}
					setData={setData}
					/>
				</Modal>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: 'white',
		marginTop: 60,
	},
	filterText: {
		fontSize: 30,
		fontWeight: '700',
		color: '#3159C4',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
})

export default FilterButton;

