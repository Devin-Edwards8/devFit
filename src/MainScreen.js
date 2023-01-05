import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BottomNavBar from './components/BottomNavBar'
import Header from './components/Header'
import quotes from './assets/quotes.json';
import { StatusBar } from 'expo-status-bar'

export default class MainScreen extends react.Component {
    getQuote = () => {
        const d = new Date();
        let time = d.getTime();
        time = Math.round(time / 86400000)
        const quoteNum = time % 99
        let quote = quotes[quoteNum]
        if(quote) {
            return quote.split(' >')
        } else {
            return ["Eight percent of success is showing up.", "Woody Allen"]
        }
    }

    render() {
        const quote = this.getQuote()
        return (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <Header />
                <Text style={styles.quote}>{quote[0]}</Text>
                <Text style={styles.author}>{quote[1]}</Text>
                <BottomNavBar onSwitch={this.props.onSwitch}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexShrink: .5,
        height: '100%',
        backgroundColor: '#220135',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    author: {
        fontSize: 30,
        fontFamily: 'Times New Roman',
        color: '#ffe0e9',
        marginTop: 15
    },
    quote: {
        fontSize: 30,
        fontFamily: 'Times New Roman',
        color: '#ffe0e9',
        marginTop: 15,
        marginRight: 5,
        marginLeft: 10
    }
});