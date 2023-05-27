import { View, Text } from 'react-native'
import { useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Card(props) {
    const [del, setDelete] = useState(false)

    const handleSwipeLeft = () => {
        setDelete(true)
    }

    const handleSwipeRight = () => {
        setDelete(false)
    }

    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });
    
    if(!fontsLoaded) {
        <></>
    } else{
        return (
            <GestureRecognizer style={styles.card} onSwipeLeft={() => handleSwipeLeft()}
            onSwipeRight={() => handleSwipeRight()}>
                {del ? 
                <View style={styles.cardDel}>
                    <View />
                    <Text style={styles.cardText}>{props.title}</Text>
                    <View style={styles.deleteButton} onTouchEnd={() => props.onDeleteCard(props.id)}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </View>
                </View> :
                <Text onTouchEnd={() => props.handleExpand({viewMode: true, id: props.id, title: props.title})} 
                style={styles.cardText}>{props.title}</Text>}
            </GestureRecognizer>
        );
    }
}
 
const styles = EStyleSheet.create({
    cardDel: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '5rem',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colorTheme.lightTheme
    },
    card: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '5rem',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colorTheme.lightTheme
    },
    cardText: {
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        fontSize: '1.8rem',
        fontWeight: 'bold'
    },
    deleteButton: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorTheme.boldTheme,
        height: '100%',
        width: '6rem',
    }, 
    deleteText: {
        color: colorTheme.lightTheme,
        fontFamily: 'Poppins_300Light',
        fontSize: '1rem'
    },
    fill: {
        width: '100%',
        aspectRatio: 1 / 2
    }
});