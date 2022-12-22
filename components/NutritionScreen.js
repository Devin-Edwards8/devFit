import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BottomNavBar from './BottomNavBar'
import Header from './Header'

export default class FitnessScreen extends react.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header /> 
                <Text style={{color: '#eb5e28'}}>TESTING 2</Text>
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
    }
});