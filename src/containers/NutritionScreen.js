import react, { useState } from 'react'
import { View, Text, TextInput, Keyboard } from 'react-native'
import BottomNavBar from '../components/BottomNavBar'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import GoalSetting from './GoalSetting'
import { colorTheme } from '../global_colors'
import PieChart from 'react-native-pie-chart'
import EStyleSheet from 'react-native-extended-stylesheet'
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins';

export default function NutritionScreen(props) {
    const input1 = react.createRef();
    const input2 = react.createRef();
    let [fontsLoaded] = useFonts({Poppins_500Medium})

    const [state, setState] = useState(
        {
            settingMode: false,
            manualEntry: false,
            currentCalorieValue: 0,
            currentProteinValue: 0,
        }
    )

    const handleGoalSet = () => {
        setState({
            settingMode: true
        })
    }

    const handleGoalClose = () => {
        setState({
            settingMode: false
        })
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
                <View style={styles.mainContainer}>
                    <Header /> 
                    {state.settingMode ? 
                        <GoalSetting onGoalClose={handleGoalClose} onGoalSet={props.onGoalSet} 
                        progressBars={props.progressBars} onReset={props.onReset}/> 
                        : 
                        <View style={styles.nutritionContainer}>
                            <View style={styles.chartsAndSearch}>
                                <SearchBar onGoalSet={handleGoalSet} onSubmission={handleSearchSubmission} isTyping={state.manualEntry}/>
                                <Text style={styles.title}>Nutrition Tracker</Text>
                                <View style={styles.chartBox}>
                                    <View style={styles.calorieChart}>
                                        <PieChart widthAndHeight={200} series={[p1.value / p1.goal, 1]} style={styles.sideMargin}
                                        sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]} key={p0.id}/>
                                        <View>
                                            <Text>calories</Text>
                                            <Text>{}/{}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.proteinChart}>
                                        <View>
                                            <Text>protein (g)</Text>
                                            <Text>{}/{}</Text>
                                        </View>
                                        <PieChart widthAndHeight={200} series={[p1.value / p1.goal, 1]} style={[styles.sideMargin]}
                                        sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]} key={p1.id}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.submissionTitle}>Add as you eat!</Text>
                                <View style={styles.submissionEntries}>
                                    <TextInput style={styles.entryBox} placeholder='calories' placeholderTextColor={colorTheme.mediumTheme} ref={input1}
                                    onChangeText={(load) => setState({...state, currentCalorieValue: load})}
                                    onPressIn={() => setState({manualEntry: true})} onSubmitEditing={() => setState({manualEntry: false})}/>
                                    <TextInput style={styles.entryBox} placeholder='protein' placeholderTextColor={colorTheme.mediumTheme} ref={input2}
                                    onChangeText={(load) => setState({...state, currentProteinValue: load})}
                                    onPressIn={() => setState({manualEntry: true})} onSubmitEditing={() => setState({manualEntry: false})}/>
                                    <View style={styles.submissionButton} onTouchEnd={() => handleManualSubmission()}>
                                        <Text style={{color: colorTheme.background}}>{"\u2713"}</Text>
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
    title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: '2rem',
        color: colorTheme.accent,
        alignSelf: 'center',
        marginTop: '.5rem'
    },
    chartBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    submissionTitle: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 13,
        color: colorTheme.boldAccent,
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
        borderColor: colorTheme.boldAccent,
        fontFamily: 'Arial',
        color: colorTheme.boldAccent,
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
    }
});