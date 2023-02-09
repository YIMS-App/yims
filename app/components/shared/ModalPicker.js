import React from 'react'
import {
    StyleSheet, Text, View,
    TouchableOpacity, Dimensions, ScrollView,
} from 'react-native'

const COLLEGES = ['All Colleges', 'Benjamin Franklin', 'Berkeley',  'Branford','Davenport', "Ezra Stiles", 'Grace Hopper', 'Jonathan Edwards', 
'Morse', 'Pauli Murray', 'Pierson', 'Silliman', 'Saybrook', 'Trumbull', 'Timothy Dwight']; 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);
    }
    const option = COLLEGES.map((item, index) => {
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={[styles.modal, {width: WIDTH - 60, height: 2 * HEIGHT / 3}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 80,
    },
    modal: {
        backgroundColor: '#DFE5F2', 
        borderRadius: 20,
    }, 
    option: {
        alignItems: 'center',
    },
    text: {
        margin: 20, 
        fontSize: 30, 
        fontWeight: 'Normal',
        color: '#3159C4',
    }
})

export {ModalPicker}