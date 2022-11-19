import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Title from './Title'

export default function StartScreen(props) {
    return (
        <View style={styles.container} onTouchEnd={() => props.onSwitch()}>
            <Title size='60'/>
            <Text style={styles.promptText}>  - touch screen to enter - </Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefae0',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    promptText: {
        fontSize: 17,
        fontWeight: '300',
        color: '#023047'
    }
});