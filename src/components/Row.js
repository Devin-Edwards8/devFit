import { View,  Text } from 'react-native'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';
import Tag from './Tag';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Row(props) {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });

    if(!fontsLoaded) {
        return <></>
    } else {
        let text0 = props.text[0]
        let text1 = props.text[1]
        let text2 = props.text[2]
        if(!text0) {
            text0 = 'no workout'
            text1 = 'n/a'
            text2 = 'n/a'
        }
        return (
            <View style={styles.rowTitle}>
                <Text style={[styles.inputText, styles.workoutText]}>{text0}</Text>
                <Tag num={props.tagNo} editMode={false}/>
                <View style={[styles.numberText, {width: '25%'}]}>
                    <Text style={[styles.inputText]}>{text1}</Text>
                </View>
                <View style={[styles.numberText, {width: '20%'}]}>
                    <Text style={[styles.inputText]}>{text2}</Text>
                </View>
            </View>
        );
    } 
}

const styles = EStyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    rowTitle: {
        flex: 0,
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colorTheme.mediumTheme
    },
    inputText: {
        fontFamily: 'Poppins_300Light',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        marginTop: '.25rem',
        marginBottom: '.25rem',
        color: colorTheme.boldTheme,
        marginLeft: '.2rem',
    },
    workoutText: {
        width: '55%'
    },
    numberText: {
        borderLeftWidth: 1,
        borderColor: colorTheme.mediumTheme
    }
})