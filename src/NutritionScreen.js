import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ProgressBar from './components/ProgressBar'
import BottomNavBar from './components/BottomNavBar'
import Header from './components/Header'
import SearchBar from './components/SearchBar'

export default class FitnessScreen extends react.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header /> 
                <SearchBar />
                <View style={styles.bubbleBox}>
                    {this.props.bubbles.map(b => <ProgressBar title={b.title} value={b.value} key={b.id} goal={b.goal}/>)}
                </View>
                <BottomNavBar onSwitch={this.props.onSwitch}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#220135',
    },
    bubbleBox: {
        flex: 0,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-evenly'
    }
});