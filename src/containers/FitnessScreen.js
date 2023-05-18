import { StyleSheet, View, Text, ScrollView, ImageBackground } from 'react-native'
import { useState } from 'react'
import BottomNavBar from '../components/BottomNavBar'
import Card from '../components/Card'
import Header from '../components/Header'
import { colorTheme } from '../global_colors'
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins';
import ExpandedCard from '../components/ExpandedCard'

export default function FitnessScreen(props) {
    const cards = props.cards
    let [fontsLoaded] = useFonts({Poppins_500Medium})
    const [state, setState] = useState({viewMode: false, id: 0, title: ''})

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
            {
                state.viewMode ? 
                <ImageBackground style={styles.outerContainer} blurRadius={90}>
                    <ExpandedCard onCondense={setState} title={state.title} onTitleChange={props.onTitleChange}
                    id={state.id} rows={props.rows} onAdd={props.onAddRow} onDelete={props.onDeleteRow}
                    onRowText={props.onRowText}/>
                    <View style={[styles.innerContainer]}>
                        <View>
                            <Header screen="fitness" onAdd={props.onAddCard}/>
                            <View style={[styles.titleContainer]}><Text style={styles.title}>Workout Library</Text></View>
                            {cards.map(card => <Card id={card.id} key={card.id} title={card.title} onDeleteCard={props.onDeleteCard}
                            handleExpand={setState}/>)}
                        </View>
                        <BottomNavBar onSwitch={props.onSwitch}/>
                    </View>
                </ImageBackground> 
                :
                <View style={styles.container}>
                    <Header screen="fitness" onAdd={props.onAddCard}/>
                    <ScrollView style={{maxWidth: '100%', width: '100%'}}>
                        <View style={styles.titleContainer}><Text style={styles.title}>Workout Library</Text></View>
                        {cards.map(card => <Card id={card.id} key={card.id} title={card.title} onDeleteCard={props.onDeleteCard}
                        handleExpand={setState}/>)}
                    </ScrollView>
                    <BottomNavBar onSwitch={props.onSwitch}/>
                </View>
            }
            </>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: '100%',
        backgroundColor: colorTheme.background,
    },
    title: {
        fontSize: 40,
        fontFamily: 'Poppins_500Medium',
        color: colorTheme.accent,
        marginLeft: 10,
        textAlign: 'center'
    },
    titleContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: colorTheme.lightTheme,
        marginTop: 15
    },
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        flex: 0,
        justifyContent: 'space-between'
    }
});