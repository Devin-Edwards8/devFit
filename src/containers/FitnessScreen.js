import { View, Text, ScrollView, ImageBackground } from 'react-native'
import { useState } from 'react'
import BottomNavBar from '../components/BottomNavBar'
import Card from '../components/Card'
import Header from '../components/Header'
import { colorTheme } from '../global_colors'
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins'
import ExpandedCard from '../components/ExpandedCard'
import EStyleSheet from 'react-native-extended-stylesheet'


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
                    onRowText={props.onRowText} onTagClick={props.onTagClick}/>
                    <View style={[styles.innerContainer, styles.blur]}>
                        <View style={{flex: 10}}>
                            <Header screen="fitness" onAdd={props.onAddCard} onSwitch={props.onSwitch}/>
                            <View style={{flex: 9}}>
                                <Text style={styles.title}>Workout Library</Text>
                                <View style={styles.rule}/>
                                <View>
                                    {cards.map(card => <Card id={card.id} key={card.id} title={card.title}/>)}
                                </View>
                            </View>
                        </View>
                        <BottomNavBar onSwitch={props.onSwitch}/>
                    </View>
                </View> 
                :
                <View style={styles.container}>
                    <View style={{flex: 10}}>
                        <Header screen="fitness" onAdd={props.onAddCard} onSwitch={props.onSwitch}/>
                        <View style={{flex: 9}}>
                            <Text style={styles.title}>Workout Library</Text>
                            <View style={styles.rule}/>
                            <ScrollView>
                                {cards.map(card => <Card id={card.id} key={card.id} title={card.title} onDeleteCard={props.onDeleteCard}
                                handleExpand={setState}/>)}
                            </ScrollView>
                        </View>
                    </View>
                    <BottomNavBar onSwitch={props.onSwitch}/>
                </View>
            }
            </>
        );
    }
}
 
const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.background,
    },
    title: {
        fontSize: '2rem',
        fontFamily: 'Poppins_500Medium',
        color: colorTheme.accent,
        textAlign: 'center',
        marginTop: '.5rem',
        marginBottom: '.5rem'
    },
    rule: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: colorTheme.lightTheme
    },
    outerContainer: {
        position: 'relative',
        flex: 1
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    blur: {
        opacity: .2
    }
});