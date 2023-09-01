import { Text, View, TextInput, ScrollView } from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import { colorTheme } from '../global_colors';
import Toggle from 'react-native-toggle-input'

export default function SettingsScreen(props) {
    let [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular, Poppins_300Light})
    const [currentCalorieValue, setCalories] = useState({cals: props.progressBars[0].value, editing: false})
    const [currentProteinValue, setProtein] = useState({prot: props.progressBars[1].value, editing: false})
    const [currentCalorieGoal, setCalorieGoal] = useState("")
    const [currentProteinGoal, setProteinGoal] = useState("")

    const submitValue = (id) => {
        let value = id === 1 ? currentCalorieValue.cals : currentProteinValue.prot
        if(!Number.isNaN(value)) {props.onValueAdjustment(value, id)}
        id === 1 ? setCalories({...currentCalorieValue, editing: false}) : setProtein({...currentProteinValue, editing: false})
    }

    const submitGoal = (id) => {
        let goal = id === 1 ? currentCalorieGoal : currentProteinGoal
        props.onGoalSet(Number(goal), id)
    }

    const handleSplitEntry = (ind, load) => {
        let tempSplits = props.split.splits
        tempSplits[ind] = load
        props.setSplit({...props.split, splits: tempSplits})
    }

    const getSplitText = ind => {
        if(props.split.splits[ind] === 'fill splits in settings!') {
            return ""
        }
        return props.split.splits[ind]
    }

    const handleSplitDay = (load) => {
        let day = Number(load) - 1
        if(Number.isInteger(day)) {
            props.setSplit({...props.split, currentDay: day})
            console.log(props.split.splits)
        }
        props.setSplit({...props.split, currentDay: 0})
    }

    const splitRows = Array.from({length: Number(props.split.rotationLength)}, (_, i) => i + 1)

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.container}>
                <View style={{flex: 10}}>
                    <Header screen='settings' onClose={props.onSwitch}/>
                    <View style={{flex: 9}}>
                    <Text style={styles.title}>Settings</Text>

                    {/* General */}

                    <Text style={styles.subtitle}>General</Text>
                    <ScrollView>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Allow Notifications</Text>
                        <View style={styles.rightMargin}>
                            <Toggle toggle={props.toggle1} setToggle={props.setToggle1} size={styles.$toggleSize} 
                            circleColor={colorTheme.lightTheme} filled={true} color={colorTheme.boldTheme}/>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Allow devFit to use your data</Text>
                        <View style={styles.rightMargin}>
                            <Toggle toggle={props.toggle2} setToggle={props.setToggle2} size={styles.$toggleSize} 
                            circleColor={colorTheme.lightTheme} filled={true} color={colorTheme.boldTheme}/>
                        </View>
                    </View>

                    {/* GOALS */}

                    <Text style={styles.subtitle}>Set Nutritional Goals</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Caloric intake</Text>
                        <TextInput style={styles.inputText} value={props.progressBars[1].value} onChangeText={(load) => setCalorieGoal(load)} 
                        onSubmitEditing={() => submitGoal(1)}/>
                    </View>
                    <View style={[styles.row]}>
                        <Text style={styles.rowText}>Grams of protein</Text>
                        <TextInput style={styles.inputText} value={props.progressBars[1].value} onChangeText={(load) => setProteinGoal(load)} 
                        onSubmitEditing={() => submitGoal(2)}/>
                    </View>

                    {/* RESET VALUES */}

                    <Text style={styles.subtitle}>Adjust Nutritional Entries</Text>
                    <View style={[styles.buttonContainer, {borderBottomWidth: 1, borderTopWidth: 1, borderColor: colorTheme.mediumTheme}]}>
                        <View style={[styles.row, {width: currentCalorieValue.editing ? '90%' : '100%', height: '100%', borderBottomWidth: currentCalorieValue.editing ? 0 : 1, borderTopWidth: currentCalorieValue.editing ? 0 : 1}]}>
                            <Text style={styles.rowText}>Caloric intake</Text>
                            <TextInput style={styles.inputText} onChangeText={(load) => setCalories({prot: Number(load), editing: true})}
                                value={currentCalorieValue.cals} />
                        </View>
                        {currentCalorieValue.editing ? 
                        <View style={styles.submissionButton} onTouchEnd={() => submitValue(2)}>
                        <Text style={{color: colorTheme.background}}>{"\u2713"}</Text></View> : <></>}
                    </View>
                    <View style={[styles.buttonContainer, {borderBottomWidth: 1, borderColor: colorTheme.mediumTheme}]}>
                        <View style={[styles.row, {width: currentProteinValue.editing ? '90%' : '100%', height: '100%', borderBottomWidth: currentProteinValue.editing ? 0 : 1}]}>
                            <Text style={styles.rowText}>Grams of protein</Text>
                            <TextInput style={styles.inputText} onChangeText={(load) => setProtein({prot: Number(load), editing: true})}
                                value={currentProteinValue.prot} />
                        </View>
                        {currentProteinValue.editing ? 
                        <View style={styles.submissionButton} onTouchEnd={() => submitValue(2)}>
                        <Text style={{color: colorTheme.background}}>{"\u2713"}</Text></View> : <></>}
                    </View>

                    {/* Split Setting */}

                    <Text style={styles.subtitle}>Home Screen Data</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Customize split rotation</Text>
                        <View style={styles.rightMargin}>
                            <Toggle toggle={props.toggle3} setToggle={props.setToggle3} size={styles.$toggleSize} 
                            circleColor={colorTheme.lightTheme} filled={true} color={colorTheme.boldTheme}/>
                        </View>
                    </View>
                    {props.toggle3 ? 
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.rowText}>Length of rotation (days)</Text>
                            <TextInput style={styles.inputText} placeholder='7 (default)' 
                            placeholderTextColor={colorTheme.mediumTheme}
                            onChangeText={load => props.setSplit({...props.split, rotationLength: load})}
                                value={props.split.rotationLength}/>
                        </View>
                        {splitRows.map(e =>
                        <View style={styles.row} key={e}>
                            <Text style={styles.rowText}>Day {e}</Text>
                            <TextInput style={styles.inputText} placeholder='title'
                            onChangeText={(load) => handleSplitEntry(e - 1, load)} 
                            placeholderTextColor={colorTheme.mediumTheme} value={getSplitText(e - 1)} />
                        </View>
                        )}
                        <View style={styles.row}>
                            <Text style={styles.rowText}>Set current split day</Text>
                            <TextInput style={styles.inputText} onChangeText={load => handleSplitDay(load)}
                            placeholder={String(Number(props.split.currentDay) + 1)} placeholderTextColor={colorTheme.mediumTheme}/>
                        </View>
                    </View>
                     :
                    <></>
                    }
                    </ScrollView>
                    </View>
                </View>
                <BottomNavBar onSwitch={props.onSwitch} />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colorTheme.background
    },
    title: {
        fontSize: '2rem',
        fontFamily: 'Poppins_500Medium',
        color: colorTheme.accent,
        textAlign: 'center',
        marginTop: '.5rem'
    }, 
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: '1rem',
        color: colorTheme.boldTheme,
        marginTop: '1.5rem',
        marginLeft: '.3rem'
    },
    topRow: {
        borderTopWidth: 1
    },
    row: {
        width: '100%',
        minHeight: '3rem',
        borderBottomWidth: 1,
        borderColor: colorTheme.mediumTheme,
        backgroundColor: colorTheme.lightTheme,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    doubleRow: {
        height: '6rem',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    rowText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: '.9rem',
        color: colorTheme.boldTheme,
        marginLeft: '.3rem'
    },
    inputContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        height: '100%'
    },
    buttonContainer: {
        width: '100%', 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: colorTheme.lightTheme, 
        height: '3rem'
    },
    submissionButton :{
        maxWidth: '2rem',
        marginRight: '1%',
        aspectRatio: 1/1,
        borderRadius: '.25rem',
        backgroundColor: colorTheme.accent,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        width: '25%',
        height: '80%',
        textAlign: 'center',
        color: colorTheme.boldTheme,
        borderWidth: 1,
        borderColor: colorTheme.mediumTheme,
        marginRight: '.3rem',
        borderRadius: '.2rem'
    },
    rightMargin: {
        marginRight: '.3rem'
    },
    $toggleSize: '1.2rem',
});