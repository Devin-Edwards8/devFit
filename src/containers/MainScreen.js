import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BottomNavBar from '../components/BottomNavBar'
import Header from '../components/Header'
import Title from '../components/Title'
import quotes from '../assets/quotes.json';
import { StatusBar } from 'expo-status-bar'
import { colorTheme } from '../global_colors';

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
                <View style={styles.mainContainer}>
                    <Header />
                    <Title />
                    <View style={styles.boxContainer}>
                        <View style={[styles.box, styles.wideBox]}></View>
                        <View style={{flex: 0, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                            <View style={[styles.box, styles.narrowBox]}></View>
                            <View style={[styles.box, styles.narrowBox]}></View>
                        </View>
                        <View style={[styles.box, styles.wideBox]}>
                            <Text style={styles.quote}>{quote[0]} -{quote[1]}</Text>
                        </View>
                    </View>
                </View>
                <BottomNavBar onSwitch={this.props.onSwitch}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colorTheme.background,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    wideBox: {
        width: '96%',
        aspectRatio: 2/1
    },
    narrowBox: {
        width: '48%',
        aspectRatio: 1/1
    },
    box: {
        backgroundColor: colorTheme.lightTheme,
        borderRadius: 5,
    },
    quote: {
        fontSize: 15,
        fontFamily: 'Times New Roman',
        color: colorTheme.highContrast,
        marginTop: 15,
        marginRight: 5,
        marginLeft: 10
    }
});