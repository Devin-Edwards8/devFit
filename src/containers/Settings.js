import { StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import { colorTheme } from '../global_colors';

export default function SettingsScreen(props) {
    let [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular, Poppins_300Light})

    if(!fontsLoaded) {
        return <></>
    } else {
        return (
            <View style={styles.container}>
                <View>
                    <Header screen='settings'/>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>General</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Allow Notifications</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Allow devFit to use your data</Text>
                    </View>
                    <Text style={styles.subtitle}>Set Nutritional Goals</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Caloric intake</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Grams of protein</Text>
                    </View>
                        <Text style={styles.subtitle}>Home Screen Data</Text>
                    <View style={[styles.row, styles.topRow]}>
                        <Text style={styles.rowText}>Customize split rotation</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Length of rotation (days)</Text>
                    </View>
                    <View>
                        <Text style={styles.rowText}>Enter split titles separated by commas</Text>
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
    rowText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: '.9rem',
        color: colorTheme.boldTheme,
        marginLeft: '.3rem'
    },

});