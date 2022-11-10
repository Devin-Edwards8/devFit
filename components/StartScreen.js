import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect, useCallback } from 'react';

export default function StartScreen() {
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
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.title}>DevFit</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c6d4e5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 60,
        color: '#cd5b45',
        fontFamily: 'TitanOne'
    }
});