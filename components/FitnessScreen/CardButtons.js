import react from 'react'
import { StyleSheet, View, Text, } from 'react-native'

export default function CardButtons(props) {
    return (
        <View style={styles.container}>
            <View style={styles.button} onTouchEnd={() => props.onAdd()}>
                <Text style={styles.text}>add</Text>
            </View>
            <View style={styles.button} onTouchEnd={() => props.onDelete()}>
                <Text style={styles.text}>delete</Text>
            </View>
            <View style={styles.button} onTouchEnd={() => props.onCondense()}>
                <Text style={styles.text}>minimize</Text>
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
        justifyContent: 'space-between'
    },
    button: {
        flex: 0,
        alignItems: 'center',
        backgroundColor: '#ffc2d4',
        padding: 5,
        borderRadius: 10,
        width: 80
    },
    text: {
        fontFamily: 'Arial',
        color: '#220135',
        fontSize: 15,
    }
});