import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Title from './Title'
import Bubble from './Bubble'
import BottomNavBar from './BottomNavBar'

export default class MainScreen extends react.Component {
    render() {
        return (
            <View style={styles.container}>
                <Title /> 
                <Bubble title='cals' val='20'/> 
                <BottomNavBar />
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fefae0',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});