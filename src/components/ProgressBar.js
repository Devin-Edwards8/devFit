import { StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ProgressBar(props) {
    let width = 0
    if(props.goal !== 0) {
        width = Math.min((props.value / props.goal) * 360, 360)
    }
    return (
        <>
            <View style={styles.bubble}>
                <Text style={[styles.bubbleText, styles.textPosition]}>{props.title}</Text>
                <Text style={[styles.bubbleText, styles.valuePosition]}>{props.value} / {props.goal}</Text>
            </View>
            <View style={[styles.bubbleFill, {width: width}]}>
                <Text style={[styles.bubbleText, styles.textPosition]}>{props.title}</Text>
                <Text style={[styles.bubbleText, styles.valuePosition]}>{props.value} / {props.goal}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
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
        position: 'relative',
        backgroundColor: "#e05780",
        borderRadius: 10,
        overflow: 'hidden',
        height: 50,
        marginTop: -60,
        marginLeft: 10
    },
    bubbleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: '#190028',
    },
    valuePosition: {
        position: 'absolute',
        left: 150
    }, 
    textPosition: {
        position: 'absolute',
        left: 5
    }
});