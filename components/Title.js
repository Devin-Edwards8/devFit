import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect, useCallback } from 'react';

export default function StartScreen(props) {
    const [fontsLoaded] = useFonts({
    'TitanOne': require('../assets/Titan_One/TitanOne-Regular.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Text style={[styles.title, {backgroundColor: props.color}]} onLayout={onLayoutRootView}>devFit</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#e05780',
        fontFamily: 'TitanOne',
        fontSize: 50,
        paddingTop: 30
    }
});
