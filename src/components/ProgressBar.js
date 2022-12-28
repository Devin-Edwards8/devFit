import { StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ProgressBar(props) {
    return (
        <>
            <View style={styles.bubble}>
                <Text style={[styles.bubbleText, {marginLeft: 10}]}>{props.title}</Text>
                <Text style={[styles.bubbleText, {marginLeft: 170}]}>{props.value} / {props.goal}</Text>
            </View>
            <View style={[styles.bubbleFill, {width: 10}]}>
                <Text style={[styles.fillText, {marginLeft: 10}]}>{props.title}</Text>
                <Text style={[styles.fillText, {marginLeft: 170}]}>{props.value} / {props.goal}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#ffc2d4",
        borderRadius: 10,
        overflow: 'hidden',
        height: 50,
        width: 360,
        margin: 10
    },
    bubbleFill: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: -60,
        backgroundColor: '#e05780',
        borderRadius: 10,
        overflow: 'hidden',
        height: 50
    },
    bubbleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#190028'
    },
    fillText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#190028',
    }
});