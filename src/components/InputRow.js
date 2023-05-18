import { StyleSheet, View,  TextInput } from 'react-native'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';

export default function (props) {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.rowTitle}>
                <TextInput style={[styles.inputText, styles.workoutText]} placeholder="enter workout" placeholderTextColor={colorTheme.mediumTheme}
                onChangeText={(payload) => props.onRowText(payload, props.id, 0, props.cardID)}>{props.text[0]}</TextInput>
                <View style={[styles.numberText, {width: '25%'}]}>
                    <TextInput style={[styles.inputText]} placeholder="-" placeholderTextColor={colorTheme.mediumTheme}
                    onChangeText={(payload) => props.onRowText(payload, props.id, 1, props.cardID)}>{props.text[1]}</TextInput>
                </View>
                <View style={[styles.numberText, {width: '20%'}]}>
                    <TextInput style={[styles.inputText]} placeholder="-" placeholderTextColor={colorTheme.mediumTheme}
                    onChangeText={(payload) => props.onRowText(payload, props.id, 2, props.cardID)}>{props.text[2]}</TextInput>
                </View>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
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
        fontSize: 15,
        color: colorTheme.boldTheme,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
    },
    workoutText: {
        width: '55%'
    },
    numberText: {
        borderLeftWidth: 1,
        borderColor: colorTheme.mediumTheme
    }
})