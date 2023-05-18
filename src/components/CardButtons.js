import react from 'react'
import { StyleSheet, View, Text, } from 'react-native'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins';

export default function CardButtons(props) {
    let [fontsLoaded] = useFonts({
        Poppins_500Medium
      });

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

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10,
        flex: 0,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        flex: 0,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colorTheme.boldTheme,
        padding: 5,
        borderRadius: 10,
        width: 80
    },
    text: {
        fontFamily: 'Poppins_500Medium',
        color: colorTheme.boldTheme,
        fontSize: 15,
    }
});