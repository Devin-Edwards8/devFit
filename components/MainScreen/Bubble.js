import { StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Bubble(props) {
    return (
        <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{props.title}</Text>
            <Text style={styles.bubbleText}>{props.val}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#edf6f9",
        borderRadius: 75,
        overflow: 'hidden',
        border: 2,
        height: 150,
        width: 150,
        margin: 20
    },
    bubbleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        color: '#283618'
    }
});