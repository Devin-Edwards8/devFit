import { View, Text, TextInput } from 'react-native';
import { colorTheme } from '../global_colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function SettingRow(props) {
    const topBorder = props.topRow ? {borderTopWidth: 1} : {}
    return (
        <View style={[styles.row, topBorder]}>
            <Text style={styles.rowText}>{props.rowText}</Text>
            <TextInput style={styles.inputText} value={props.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[1].id)} />
        </View>
    );
}

const styles = EStyleSheet.create({
    row: {
        width: '100%',
        minHeight: '3rem',
        borderBottomWidth: 1,
        borderColor: colorTheme.mediumTheme,
        backgroundColor: colorTheme.lightTheme,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: '.9rem',
        color: colorTheme.boldTheme,
        marginLeft: '.3rem'
    },
    inputText: {
        width: '25%',
        height: '80%',
        textAlign: 'center',
        color: colorTheme.boldTheme,
        borderWidth: 1,
        borderColor: colorTheme.mediumTheme,
        marginRight: '.3rem',
        borderRadius: '.2rem'
    }
})