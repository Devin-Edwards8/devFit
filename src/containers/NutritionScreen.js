import react, { useState } from 'react'
import { View, Text, TextInput, Keyboard } from 'react-native'
import BottomNavBar from '../components/BottomNavBar'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { colorTheme } from '../global_colors'
import PieChart from 'react-native-pie-chart'
import EStyleSheet from 'react-native-extended-stylesheet'
import {useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import SearchResults from '../components/SearchResults'

export default function NutritionScreen(props) {
    const input1 = react.createRef();
    const input2 = react.createRef();
    let [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular, Poppins_300Light})
    const [state, setState] = useState(
        {
            settingMode: false,
            manualEntry: false,
            searched: false,
            currentCalorieValue: 0,
            currentProteinValue: 0,
            results: []
        }
    )

    const handleSearch = async(searchText) => {
        const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + searchText
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '019329eaffmsh9c1997011fad833p1447b9jsn04995410a57e',
                'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
            }
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setState({...state, searched: true, results: result})
        } catch (error) {
            console.error(error);
        }
    }

    const handleManualSubmission = () => {
        props.onValueChange(state.currentCalorieValue, 1)
        props.onValueChange(state.currentProteinValue, 2)
        input1.current.clear()
        input2.current.clear()
        Keyboard.dismiss()
        setState({
            ...state,
            currentCalorieValue: 0,
            currentProteinValue: 0,
            manualEntry: false
        })
    }

    const handleSearchSubmission = (cals, prot) => {
        props.onValueChange(cals, 1)
        props.onValueChange(prot, 2)
    }

    const p0 = props.progressBars[0]
    const p1 = props.progressBars[1]

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    {state.searched ? 
                    <View style={{flex: 1}}>
                        <Header onSwitch={props.onSwitch} />
                        <SearchBar handleSearch={handleSearch}/>
                        <SearchResults results={state.results} onSubmission={handleSearchSubmission} onReturn={setState}/>
                    </View> :
                    <View style={styles.mainContainer}>
                        <Header onSwitch={props.onSwitch} />
                        <View style={styles.nutritionContainer}>
                            <View style={styles.chartsAndSearch}>
                                <SearchBar handleSearch={handleSearch}/>
                                <Text style={styles.title}>Nutrition Tracker</Text>
                                <View style={styles.chartBox}>
                                    <View style={styles.chartContainer}>
                                        <PieChart widthAndHeight={styles.$pieSize} series={[p0.value / p0.goal, 1]}
                                        sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]} key={p0.id}/>
                                        <View>
                                            <Text style={styles.chartText}>calories</Text>
                                            <Text style={styles.chartText}>{p0.value}/{p0.goal}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.chartContainer}>
                                        <View>
                                            <Text style={styles.chartText}>protein (g)</Text>
                                            <Text style={styles.chartText}>{p1.value}/{p1.goal}</Text>
                                        </View>
                                        <PieChart widthAndHeight={styles.$pieSize} series={[p1.value / p1.goal, 1]}
                                        sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]} key={p1.id}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.submissionTitle}>Add as you eat!</Text>
                                <View style={styles.submissionEntries}>
                                    <TextInput style={styles.entryBox} placeholder='calories' placeholderTextColor={colorTheme.mediumTheme} ref={input1}
                                    onChangeText={(load) => setState({...state, currentCalorieValue: load})} />
                                    <TextInput style={styles.entryBox} placeholder='protein' placeholderTextColor={colorTheme.mediumTheme} ref={input2}
                                    onChangeText={(load) => setState({...state, currentProteinValue: load})} />
                                    <View style={styles.submissionButton} onTouchEnd={() => handleManualSubmission()}>
                                        <Text style={{color: colorTheme.background}}>{"\u2713"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    }
                </View>
                <BottomNavBar onSwitch={props.onSwitch}/>
            </View>
        );
    }
}
 
const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: colorTheme.background,
    },
    nutritionContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    chartsAndSearch: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    chartContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: '2rem',
        color: colorTheme.accent,
        alignSelf: 'center',
        marginTop: '.5rem'
    },
    chartText: {
        fontSize: '1.5rem',
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme
    },
    chartBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    submissionTitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: '.8rem',
        color: colorTheme.boldTheme,
        margin: 5
    },
    submissionEntries: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: colorTheme.lightTheme,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    entryBox: {
        flex: 2,
        width: '40%',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        height: 30,
        backgroundColor: colorTheme.background,
        borderWidth: 1,
        borderColor: colorTheme.boldTheme,
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        paddingLeft: 5
    },
    submissionButton: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        backgroundColor: colorTheme.mediumTheme
    },
    sideMargin: {
        marginRight: '.5rem',
        marginLeft: '.5rem'
    },
    $pieSize: '12rem'
});