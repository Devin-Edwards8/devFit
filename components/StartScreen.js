import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from './Title'

export default function StartScreen(props) {
    return (
        <View style={styles.container} onTouchEnd={() => props.onSwitch(1)}>
            <Title size='60' color='#190028'/>
            <Text style={styles.promptText}>  - touch screen to enter - </Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190028',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }, 
    promptText: {
        fontSize: 17,
        fontWeight: '300',
        color: '#ffc2d4',
        fontFamily: 'Cochin'
    }
});