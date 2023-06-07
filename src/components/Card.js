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
                    <View style={styles.deleteButton} onTouchEnd={() => props.onDeleteCard(props.id)} onClick={() => props.onDeleteCard(props.id)}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </View>
                </View> :
                <Text onTouchEnd={() => props.handleExpand({viewMode: true, id: props.id, title: props.title})} 
                onClick={() => props.handleExpand({viewMode: true, id: props.id, title: props.title})} 
                style={[styles.cardText, {cursor: 'pointer'}]}>{props.title}</Text>}
            </GestureRecognizer>
        );
    }
}
 
const styles = EStyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '5rem',
        borderBottomWidth: 1,
        borderColor: colorTheme.lightTheme
    },
    cardDel: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colorTheme.lightTheme,
        cursor: 'pointer'
    },
    cardText: {
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        fontSize: '1.8rem'
    },
    deleteButton: {
        height: '100%',
        width: '6rem',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorTheme.boldTheme
    }, 
    deleteText: {
        color: colorTheme.lightTheme,
        fontFamily: 'Poppins_300Light',
        fontSize: '1rem'
    }
});