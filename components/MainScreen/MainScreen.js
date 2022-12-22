import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Bubble from './Bubble'
import BottomNavBar from '../BottomNavBar'
import Header from '../Header'

export default class MainScreen extends react.Component {
    getQuote = () => {

    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Text>""</Text>
                <Bubble title='cals' val='20'/> 
                <Bubble title='push' val='day'/>
                <BottomNavBar onSwitch={this.props.onSwitch}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#220135',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }, 
    quote: {

    }
});