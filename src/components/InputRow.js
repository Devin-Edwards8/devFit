import { View,  TextInput } from 'react-native'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';
import EStyleSheet from 'react-native-extended-stylesheet';
import Tag from './Tag';

export default function InputRow(props) {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.rowTitle}>
                <View style={styles.workoutText}>
                    <TextInput style={[styles.inputText]} placeholder="enter workout" placeholderTextColor={colorTheme.mediumTheme}
                    onChangeText={(payload) => props.onRowText(payload, props.id, 0, props.cardID)} value={props.text[0]} />
                    <Tag num={props.tagNo} editMode={true} onTagClick={props.onTagClick} cardID={props.cardID} id={props.id} />
                </View>
                <View style={[styles.numberText, {width: '25%'}]}>
                    <TextInput style={[styles.inputText]} placeholder="-" placeholderTextColor={colorTheme.mediumTheme}
                    onChangeText={(payload) => props.onRowText(payload, props.id, 1, props.cardID)} value={props.text[1]} />
                </View>
                <View style={[styles.numberText, {width: '20%'}]}>
                    <TextInput style={[styles.inputText]} placeholder="-" placeholderTextColor={colorTheme.mediumTheme}
                    onChangeText={(payload) => props.onRowText(payload, props.id, 2, props.cardID)} value={props.text[2]} />
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
        color: colorTheme.boldTheme,
        marginLeft: '.2rem',
        marginRight: '.2rem',
        flexGrow: 1
    },
    workoutText: {
        width: '55%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '.25rem',
        paddingBottom: '.25rem'
    },
    numberText: {
        borderLeftWidth: 1,
        borderColor: colorTheme.mediumTheme
    }
})