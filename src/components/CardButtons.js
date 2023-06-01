import { View, Text, } from 'react-native'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function CardButtons(props) {
    let [fontsLoaded] = useFonts({
        Poppins_500Medium
      });

    if(!fontsLoaded) {
        return <></>
    }
    return (
        <View style={styles.container}>
            <View style={styles.button} onTouchEnd={() => props.onAdd(props.id)}>
                <Text style={styles.text}>add</Text>
            </View>
            <View style={styles.button} onTouchEnd={() => props.onDelete(props.id)}>
                <Text style={styles.text}>delete</Text>
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '.5rem',
        marginBottom: '.3rem'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colorTheme.boldTheme,
        padding: '.5rem',
        borderRadius: '.5rem',
        maxWidth: '5rem'
    },
    text: {
        fontFamily: 'Poppins_500Medium',
        color: colorTheme.boldTheme,
        fontSize: '1rem',
    }
});