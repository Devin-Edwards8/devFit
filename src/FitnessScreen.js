import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import BottomNavBar from './components/BottomNavBar'
import Card from './components/Card'
import AddCard from './components/AddCard'
import Header from './components/Header'

export default function FitnessScreen(props) {
    const cards = props.cards
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleContainer}><Text style={styles.title}>Workouts</Text></View>
            {cards.map(card => <Card id={card.id} key={card.id} title={card.title} onDeleteCard={props.onDeleteCard}
                        onTitleChange={props.onTitleChange} rows={props.rows} onAdd={props.onAddRow} onDeleteRow={props.onDeleteRow}
                        onRowText={props.onRowText}/>)}
            <AddCard onAdd={props.onAddCard} />
            <BottomNavBar onSwitch={props.onSwitch}/>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#220135',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 40,
        fontFamily: 'Arial Rounded MT Bold',
        color: '#ffc2d4',
        marginLeft: 10
    },
    titleContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ffe0e9',
        marginTop: 15
    }
});