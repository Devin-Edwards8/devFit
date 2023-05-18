import react from 'react'
import { View, Text } from 'react-native'
import BottomNavBar from '../components/BottomNavBar'
import Header from '../components/Header'
import Title from '../components/Title'
import quotes from '../assets/quotes.json';
import { StatusBar } from 'expo-status-bar'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import EStyleSheet from 'react-native-extended-stylesheet'
import PieChart from 'react-native-pie-chart'

export default function MainScreen(props) {
    let [fontsLoaded] = useFonts({Poppins_400Regular, Poppins_300Light})

    const getQuote = () => {
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

    // const quote = getQuote()
    const quote = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",  "Devin Edwards"]

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.container}>
                <StatusBar style="light"/>
                <View style={styles.mainContainer}>
                    <Header />
                    <Title />
                    <View style={styles.boxContainer}>
                        <View style={[styles.box, styles.wideBox]}>
                            <Text style={styles.cardTitle}>Today's Report</Text>
                            <View style={styles.rule}/>
                        </View>
                        <View style={{flex: 0, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                            <View style={[styles.box, styles.narrowBox]}>
                                <Text style={[styles.cardTitle, styles.smallTitle]}>Weekly Progress</Text>
                                <View style={[styles.rule, {width: '90%'}]}/>
                                <PieChart widthAndHeight={styles.$pieSize} series={[2/3, 1]} style={styles.pieGap} 
                                sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]}/>
                            </View>
                            <View style={[styles.box, styles.narrowBox]}>
                                <Text style={[styles.cardTitle, styles.smallTitle]}>Today in Fitness</Text>
                                <View style={[styles.rule, {width: '90%'}]}/>
                                <Text style={[styles.body, styles.ruleGap]}>Coming Soon...</Text>
                            </View>
                        </View>
                        <View style={[styles.box, styles.wideBox]}>
                            <Text style={styles.cardTitle}>Quote of the Day</Text>
                            <View style={styles.rule}/>
                            <View style={{flex: 0}}><Text style={[styles.body, styles.ruleGap]}>{quote[0]} ~{quote[1]}</Text></View>
                        </View>
                    </View>
                </View>
                <BottomNavBar onSwitch={props.onSwitch}/>
            </View>
        );        
    }

}
 
const styles = EStyleSheet.create({
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
        justifyContent: 'space-evenly',
    },
    cardTitle: {
        marginTop: '.5rem',
        marginBottom: '.5rem',
        fontFamily: 'Poppins_400Regular',
        fontSize: '1.7rem',
        color: colorTheme.boldTheme
    },
    smallTitle: {
        fontSize: '1.2rem'
    },
    rule: {
        width: '95%',
        borderTopWidth: 1,
        borderColor: colorTheme.mediumTheme
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
        flex: 0, 
        alignItems: 'center'
    },
    body: {
        fontSize: '1.2rem',
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        textAlign: 'center'
    },
    ruleGap: {
        marginTop: '1rem'
    },
    pieGap: {
        marginTop: '.5rem'
    },
    $pieSize: '8rem'
});