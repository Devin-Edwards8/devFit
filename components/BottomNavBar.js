import react from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class BottomNavBar extends react.Component {
    render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.button}></View>
                <View style={styles.button}></View>
                <View style={styles.button}></View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    navbar: {
        flex: 0,
        width: '100%',
        height: 120,
        marginTop: 'auto',
        flexDirection: 'row',
        backgroundColor: '#e9edc9'
    },
    button: {
        borderTopWidth: 1,
        borderColor: '#ccd5ae',
        height: '100%',
        width: '33.3%'
    }
});