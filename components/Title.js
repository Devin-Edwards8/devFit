import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect, useCallback } from 'react';

export default function StartScreen(props) {
    const [fontsLoaded] = useFonts({
    'TitanOne': require('./fonts/Titan_One/TitanOne-Regular.ttf'),
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
        <Text style={[styles.title]} onLayout={onLayoutRootView}>devFit</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#386641',
        fontFamily: 'TitanOne',
        textShadowColor: '#cad2c5',
        textShadowRadius: 10,
        fontSize: 50,
        padding: 60
    }
});
