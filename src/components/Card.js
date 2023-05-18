import { StyleSheet, View, Text } from 'react-native'
import { useState } from 'react';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';

export default function Card(props) {
    const [del, setDelete] = useState(false)

    const handleSwipeLeft = (gestureState) => {
        setDelete(true)
    }

    const handleSwipeRight = (gestureState) => {
        setDelete(false)
    }

    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });
    
    if(!fontsLoaded) {
        <></>
    } else{
        return (
            <GestureRecognizer style={styles.card} onSwipeLeft={(state) => handleSwipeLeft(state)}
            onSwipeRight={(state) => handleSwipeRight()}>
                <View></View>
                <Text onTouchEnd={() => props.handleExpand({viewMode: true, id: props.id})} style={styles.cardText}>{props.title}</Text>
                {del ? <View style={styles.deleteButton} onTouchEnd={() => props.onDeleteCard(props.id)}>
                    <Text style={styles.deleteText}>Delete</Text></View> : <View></View>}
            </GestureRecognizer>
        );
    }
}
 
const styles = StyleSheet.create({
    card: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colorTheme.lightTheme
    },
    cardText: {
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        fontSize: 30,
        fontWeight: 'bold',
    },
    deleteButton: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorTheme.lightAccent,
        height: '100%',
        width: 100,
    }, 
    deleteText: {
        color: colorTheme.highContrast,
        fontFamily: 'Poppins_300Light',
    },
    fill: {
        width: '100%',
        aspectRatio: 1 / 2
    }
});