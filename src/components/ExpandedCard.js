import react, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import CardButtons from './CardButtons';
import InputRow from './InputRow'

export default function ExpandedCard(props) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.cardText} onChangeText={((payload) => props.onTitleChange(payload, props.id))}>{props.title}</TextInput>
            <View style={styles.rowTitle}>
                <Text style={[styles.inputText, styles.workoutText]}>workout</Text>
                <View style={styles.numberText}><Text style={[styles.inputText]}>sets</Text></View>
                <View style={styles.numberText}><Text style={[styles.inputText]}>reps</Text></View>
            </View>
            {props.rows.map(row => <InputRow id={row.id} key={row.id} text={row.text} onRowText={props.onRowText}/>)}
            <CardButtons onCondense={props.onCondense} onAdd={props.onAdd} onDelete={props.onDelete}/>
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
        borderTopWidth: 2,
        marginTop: 5,
        borderColor: '#e05780'
    },
    cardText: {
        fontFamily: 'Arial',
        color: '#e05780',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10
    }, 
    inputText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: '#ffc2d4',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
    },
    workoutText: {
        width: '60%'
    },
    numberText: {
        width: '20%',
        borderLeftWidth: 2,
        borderColor: '#e05780'
    }
});