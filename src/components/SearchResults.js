import { StyleSheet, TextInput, View, Image, Text} from 'react-native';
import React from 'react';
import { colorTheme } from '../global_colors';

export default function SearchResults(props) {
    const cals = props.itemCals
    const prot = props.itemProt
    return(
        <View style={[styles.container1, styles.gap]}>
            <View style={styles.container2}>
                <Text style={styles.resultText}>Item: {props.currentItem}</Text>
                <Text style={styles.resultText}>Estimated Calories: {cals}</Text>
                <Text style={styles.resultText}>Estimated Protein Content: {prot}g</Text>
            </View>
            <View style={[styles.submissionButton]} onTouchEnd={() => props.onSubmission(cals, prot)}>
                <Text>{"\u2713"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    responseSpace: {
        flex: 1,
        flexDirection: 'column'
    },
    resultText: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: colorTheme.highContrast,
        width: 310, 
        marginLeft: 1
    }, 
    gap: {
        marginBottom: 25,
    },
    container1: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container2: {
        flex: 0,
        flexDirection: 'column'
    },
    submissionButton: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        backgroundColor: colorTheme.lightAccent
    }
});