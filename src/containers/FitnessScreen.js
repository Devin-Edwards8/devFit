import { View, Text, ScrollView, ImageBackground } from 'react-native'
import { useState } from 'react'
import BottomNavBar from '../components/BottomNavBar'
import Card from '../components/Card'
import Header from '../components/Header'
import { colorTheme } from '../global_colors'
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins'
import ExpandedCard from '../components/ExpandedCard'
import EStyleSheet from 'react-native-extended-stylesheet'
import { BlurView } from 'expo-blur'


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
                <View style={styles.outerContainer}>
                    <ExpandedCard onCondense={setState} title={state.title} onTitleChange={props.onTitleChange}
                    id={state.id} rows={props.rows} onAdd={props.onAddRow} onDelete={props.onDeleteRow}
                    onRowText={props.onRowText}/>
                    <View style={[styles.innerContainer, styles.blur]}>
                        <View>
                            <Header screen="fitness" onAdd={props.onAddCard}/>
                            <View style={[styles.titleContainer]}><Text style={[styles.title, styles.blur]}>Workout Library</Text></View>
                            {cards.map(card => <Card id={card.id} key={card.id} title={card.title} onDeleteCard={props.onDeleteCard}
                            handleExpand={setState}/>)}
                        </View>
                        <BottomNavBar onSwitch={props.onSwitch}/>
                    </View>
                </View> 
                :
                <View style={styles.container}>
                    <Header screen="fitness" onAdd={props.onAddCard} onSwitch={props.onSwitch}/>
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
 
const styles = EStyleSheet.create({
    container: {
        flex: 0,
        height: '100%',
        backgroundColor: colorTheme.background,
    },
    title: {
        fontSize: '2rem',
        fontFamily: 'Poppins_500Medium',
        color: colorTheme.accent,
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
    },
    blur: {
        opacity: .2
    }
});