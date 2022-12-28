import react, { useState } from 'react'
import { StyleSheet, View,  TextInput } from 'react-native'
import CondenseButton from './CardButtons';

export default function ExpandedCard(props) {
    return (
        <View style={styles.rowTitle}>
            <TextInput style={[styles.inputText, styles.workoutText]} placeholder="enter workout" placeholderTextColor="#540b0e"
            onChangeText={(payload) => props.onRowText(payload, props.id, 0)}>{props.text[0]}</TextInput>
            <View style={styles.numberText}>
                <TextInput style={[styles.inputText]} placeholder="-" placeholderTextColor="#540b0e"
                onChangeText={(payload) => props.onRowText(payload, props.id, 1)}>{props.text[1]}</TextInput>
            </View>
            <View style={styles.numberText}>
                <TextInput style={[styles.inputText]} placeholder="-" placeholderTextColor="#540b0e"
                onChangeText={(payload) => props.onRowText(payload, props.id, 2)}>{props.text[2]}</TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    rowTitle: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 2,
        borderColor: '#e05780'
    },

    inputText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: '#ffc2d4',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
    },
    workoutText: {
        width: '60%'
    },
    numberText: {
        width: '20%',
        borderLeftWidth: 2,
        borderColor: '#e05780'
    }
})