import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colorTheme } from '../global_colors';

export default function AddCard(props) {
    return (
        <View style={styles.button} onTouchEnd={() => props.onAdd()}>
            <Text style={styles.buttonText}>Add Card</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 0,
        height: 50,
        width: 100,
        margin: 20,
        borderRadius: 10,
        backgroundColor: colorTheme.lightAccent,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 15,
        color: colorTheme.highContrast
    }
});