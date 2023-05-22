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

    const getSplitText = () => {
        if(props.split.splits[0] === 'fill splits in settings!') {return null}
        return props.split.splits.join(',')
    }

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.container}>
                <View>
                    <Header screen='settings' onClose={props.onSwitch}/>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>General</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Allow Notifications</Text>
                        <View style={styles.toggle}>
                            <Toggle toggle={props.toggle1} setToggle={props.setToggle1} size={styles.$toggleSize} circleColor={colorTheme.lightTheme} filled={true} color={colorTheme.boldTheme}/>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Allow devFit to use your data</Text>
                        <View style={styles.toggle}>
                            <Toggle toggle={props.toggle2} setToggle={props.setToggle2} size={styles.$toggleSize} circleColor={colorTheme.lightTheme} filled={true} color={colorTheme.boldTheme}/>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Set Nutritional Goals</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Caloric intake</Text>
                        <View style={styles.inputBox}>
                            <TextInput style={styles.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[0].id)}>
                                {props.progressBars[0].goal}</TextInput>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Grams of protein</Text>
                        <View style={styles.inputBox}>
                            <TextInput style={styles.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[1].id)}>
                                {props.progressBars[1].goal}</TextInput>
                        </View>
                    </View>
                        <Text style={styles.subtitle}>Home Screen Data</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Customize split rotation</Text>
                        <View style={styles.toggle}>
                            <Toggle toggle={props.toggle3} setToggle={props.setToggle3} size={styles.$toggleSize} circleColor={colorTheme.lightTheme} filled={true} color={colorTheme.boldTheme}/>
                        </View>
                    </View>
                    {props.toggle3 ? 
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.rowText}>Length of rotation (days)</Text>
                            <View style={styles.inputBox}>
                                <TextInput style={styles.inputText} placeholder='7 (default)' 
                                placeholderTextColor={colorTheme.mediumTheme}
                                onChangeText={load => props.setSplit({...props.split, rotationLength: load.split(',')})}>{props.split.rotationLength}</TextInput>
                            </View>
                        </View>
                        <View style={[styles.row, styles.doubleRow]}>
                            <Text style={styles.rowText}>Enter split titles separated by commas</Text>
                            <View style={[styles.inputBox, styles.wideBox]}>
                                <TextInput style={styles.inputText} placeholder='ex. Upper,Lower,Rest,Upper,Rest,Lower,Rest' 
                                placeholderTextColor={colorTheme.mediumTheme} 
                                onChangeText={load => props.setSplit({...props.split, splits: load.split(',')})}>{getSplitText()}</TextInput>
                            </View>
                        </View>
                    </View>
                     :
                    <></>
                    }
                </View>
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
    inputBox: {
        width: '25%',
        height: '80%',
        marginRight: '.3rem',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '.2rem',
        borderWidth: 1,
        borderColor: colorTheme.mediumTheme
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
    toggle: {
        marginRight: '.3rem'
    },
    $toggleSize: '1.2rem'
});