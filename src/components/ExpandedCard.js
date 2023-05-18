import { StyleSheet, View, Text, ScrollView, TextInput, Image } from 'react-native'
import CardButtons from './CardButtons';
import InputRow from './InputRow'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';

export default function ExpandedCard(props) {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });
    
    if(!fontsLoaded) {
        return <></>
    } else{
        return (
            <View style={styles.container}>
                <View style={{flex: 0, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Image style={styles.image} source={require('../assets/icons/new_fitness_icon.png')} />
                    <TextInput style={styles.cardText} onChangeText={((payload) => props.onTitleChange(payload, props.id))}>{props.cards[props.id - 1].title}</TextInput>
                    <Image style={styles.image} source={require('../assets/icons/exit_icon.png')} 
                    onTouchEnd={() => props.onCondense({viewMode: false, cardNo: 0})} />
                </View>
                <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                    <View style={styles.rowTitle}>
                        <Text style={[styles.inputText, styles.workoutText]}>workout</Text>
                        <View style={[styles.numberText, {width: '25%'}]}><Text style={[styles.inputText]}>set x rep</Text></View>
                        <View style={[styles.numberText, {width: '20%'}]}><Text style={[styles.inputText]}>weight</Text></View>
                    </View>
                    {props.rows[props.id].map(row => <InputRow id={row.id} key={row.id} text={row.text} onRowText={props.onRowText}
                    cardID={props.id}/>)}
                </ScrollView>
                {/* <CardButtons onCondense={props.onCondense} onAdd={props.onAdd} onDelete={props.onDelete} id={props.id}/> */}
            </View>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '98%',
        height: '30%',
        backgroundColor: colorTheme.lightTheme,
        borderRadius: '10rem',
        alignSelf: 'center',
        zIndex: 1,
        top: '30%',
        flex: 0,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowTitle: {
        flex: 0,
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        marginTop: 5,
        borderColor: colorTheme.mediumTheme
    },
    cardText: {
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center'
    }, 
    inputText: {
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        color: colorTheme.boldAccent,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
    },
    workoutText: {
        width: '55%'
    },
    numberText: {
        borderLeftWidth: 1,
        borderColor: colorTheme.mediumTheme
    },
    image: {
        width: '10%',
        aspectRatio: 1 / 1,
        marginLeft: '3%',
        marginRight: '3%'
    }
});