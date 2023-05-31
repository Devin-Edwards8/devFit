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
    let boxWidth1 = currentCalorieValue.editing ? '40%' : '25%'
    let boxWidth2 = currentProteinValue.editing ? '40%' : '25%'
    let buttonWidth1 = currentCalorieValue.editing ? '62.5%' : '100%'
    let buttonWidth2 = currentProteinValue.editing ? '62.5%' : '100%'
    const submitValue = (id) => {
        value = id === 1 ? currentCalorieValue.cals : currentProteinValue.prot
        if(!Number.isNaN(value)) {props.onValueAdjustment(value, id)}
        id === 1 ? setCalories({...currentCalorieValue, editing: false}) : setProtein({...currentProteinValue, editing: false})
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
                <Header screen='settings' onClose={props.onSwitch}/>
                <ScrollView contentContainerStyle={{flex: 0}}>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>General</Text>
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
                    <Text style={styles.subtitle}>Set Nutritional Goals</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Caloric intake</Text>
                        <View style={[{width: '25%'}, styles.rightMargin]}>
                            <View style={styles.inputBox}>
                                <TextInput style={styles.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[0].id)}>
                                    {props.progressBars[0].goal}</TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Grams of protein</Text>
                        <View style={[{width: '25%'}, styles.rightMargin]}>
                            <View style={styles.inputBox}>
                                <TextInput style={styles.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[1].id)}>
                                    {props.progressBars[1].goal}</TextInput>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Adjust Nutritional Entries</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Caloric intake</Text>
                        <View style={[styles.inputContainer, {width: boxWidth1}, styles.rightMargin]}>
                            <View style={[styles.inputBox, {width: buttonWidth1}]}>
                                <TextInput style={styles.inputText} onChangeText={(load) => setCalories({cals: Number(load), editing: true})}>
                                    {currentCalorieValue.cals}</TextInput>
                            </View>
                            {currentCalorieValue.editing ? 
                            <View style={styles.submissionButton} onTouchEnd={() => submitValue(1)}>
                                <Text style={{color: colorTheme.background}}>{"\u2713"}</Text></View> : <></>}
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Grams of protein</Text>
                        <View style={[styles.inputContainer, styles.rightMargin, {width: boxWidth2}]}>
                            <View style={[styles.inputBox, {width: buttonWidth2}]}>
                                <TextInput style={styles.inputText} onChangeText={(load) => setProtein({prot: Number(load), editing: true})}>
                                    {currentProteinValue.prot}</TextInput>
                            </View>
                            {currentProteinValue.editing ? 
                            <View style={styles.submissionButton} onTouchEnd={() => submitValue(2)}>
                                <Text style={{color: colorTheme.background}}>{"\u2713"}</Text></View> : <></>}
                        </View>
                    </View>
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
                            <View style={[styles.inputBox, styles.rightMargin, {width: '25%'}]}>
                                <TextInput style={styles.inputText} placeholder='7 (default)' 
                                placeholderTextColor={colorTheme.mediumTheme}
                                onChangeText={load => props.setSplit({...props.split, rotationLength: load})}>
                                    {props.split.rotationLength}</TextInput>
                            </View>
                        </View>
                        {splitRows.map(e =>
                        <View style={styles.row} key={e}>
                            <Text style={styles.rowText}>Day {e}</Text>
                            <View style={[styles.inputBox, styles.rightMargin, {width: '25%'}]}>
                                <TextInput style={styles.inputText} placeholder='title'
                                onChangeText={(load) => handleSplitEntry(e - 1, load)} 
                                placeholderTextColor={colorTheme.mediumTheme}>{getSplitText(e - 1)}</TextInput>
                            </View>
                        </View>
                        )}
                        <View style={styles.row}>
                            <Text style={styles.rowText}>Set current split day</Text>
                            <View style={[styles.inputBox, styles.rightMargin, {width: '25%'}]}>
                                <TextInput style={styles.inputText} onChangeText={load => handleSplitDay(load)}
                                placeholder={String(Number(props.split.currentDay) + 1)} placeholderTextColor={colorTheme.mediumTheme}/>
                            </View>
                        </View>
                    </View>
                     :
                    <></>
                    }
                </ScrollView>
                <BottomNavBar onSwitch={props.onSwitch} />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
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
        height: '3rem',
        borderBottomWidth: 1,
        borderColor: colorTheme.mediumTheme,
        backgroundColor: colorTheme.lightTheme,
        flex: 0,
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
        flex: 0, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',
        height: '100%'
    },
    inputBox: {
        width: '100%',
        height: '80%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '.2rem',
        borderWidth: 1,
        borderColor: colorTheme.mediumTheme
    },
    submissionButton :{
        width: '19%',
        aspectRatio: 1/1,
        borderRadius: '5%',
        backgroundColor: colorTheme.accent,
        // borderColor: 'black',
        // borderWidth: 1,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wideBox: {
        width: '90%',
        height: '48%'
    },
    inputText: {
        width: '100%',
        textAlign: 'center',
        color: colorTheme.boldTheme
    },
    rightMargin: {
        marginRight: '.3rem'
    },
    $toggleSize: '1.2rem',

});