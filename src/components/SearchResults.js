import { ScrollView, View, Text} from 'react-native';
import { useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';

export default function SearchResults(props) {
    let [fontsLoaded] = useFonts({Poppins_500Medium, Poppins_400Regular, Poppins_300Light})

    if(!fontsLoaded) {
        return <></>
    }
    return(
        <View style={{flex: 1, flexGrow: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
                <Text style={styles.title}>Results</Text>
                <ScrollView contentContainerStyle={{flex: 1, flexGrow: 1}}>
                    {props.results.map((food, id) => 
                        <View style={[styles.container]} key={id}>
                            <View>
                                <Text style={styles.resultHeader}>{food.name}</Text>
                                <Text style={styles.resultText}>Serving Size: {food.serving_size_g}g</Text>
                                <Text style={styles.resultText}>Calories: {food.calories}</Text>
                                <Text style={styles.resultText}>Protein Content: {food.protein_g}g</Text>
                            </View>
                            <View style={[styles.button, styles.submission]} onTouchEnd={() => props.onSubmission(food.calories, food.protein_g)}>
                                <Text style={{color: colorTheme.boldTheme, fontSize: styles.$checkSize}}>{"\u2713"}</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={[styles.button, styles.return]} onTouchEnd={() => props.onReturn({searched: false})}>
                <Text style={[styles.resultText, {color: colorTheme.boldTheme}]}>Return {"\u21b2"}</Text>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    title: {
        fontFamily: 'Poppins_500Medium',
        fontSize: '2rem',
        color: colorTheme.accent,
        alignSelf: 'center',
        marginTop: '.5rem'
    },
    resultHeader: {
        fontFamily: 'Poppins_400Regular',
        fontSize: '1.3rem',
        color: colorTheme.boldTheme,
        marginLeft: '.3rem'
    },
    resultText: {
        fontFamily: 'Poppins_300Light',
        fontSize: '1rem',
        color: colorTheme.boldTheme,
        marginLeft: '.3rem'
    }, 
    button: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '.6rem',
        margin: '.5rem',
        backgroundColor: colorTheme.lightTheme
    },
    submission: {
        width: '2rem',
        aspectRatio: 1/1
    },
    return: {
        borderRadius: 0,
        height: '2rem'
    },
    $checkSize: '1.2rem'
});