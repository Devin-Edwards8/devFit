import { View, Text, TextInput, Image } from 'react-native'
import { useState } from 'react';
import InputRow from './InputRow'
import { colorTheme } from '../global_colors';
import {useFonts, Poppins_300Light} from '@expo-google-fonts/poppins';
import CardButtons from './CardButtons'
import EStyleSheet from 'react-native-extended-stylesheet'
import Row from './Row'


export default function ExpandedCard(props) {
    let [fontsLoaded] = useFonts({
        Poppins_300Light
      });
    const [editMode, toggleEdit] = useState(false)
    
    if(!fontsLoaded) {
        return <></>
    } else{
        return (
            <>
            {
            editMode ? 
            <View style={[styles.container, {paddingBottom: 0}]}>
                <View style={{flex: 0, flexShrink: 1, flexGrow: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Image style={[styles.image, styles.close]} source={require('../assets/icons/close_icon2.png')} 
                    onTouchEnd={() => props.onCondense({viewMode: false, cardNo: 0})}/>
                    <TextInput style={styles.cardText} onChangeText={((payload) => props.onTitleChange(payload, props.id))}>{props.title}</TextInput>
                    <Image style={[styles.image, styles.edit]} source={require('../assets/icons/editing_icon.jpeg')} 
                    onTouchEnd={() => toggleEdit(false)}/>
                </View>
                <View style={{flex: 0, alignItems: 'center'}}>
                    <View style={styles.rowTitle}>
                        <Text style={[styles.inputText, styles.workoutText]}>workout</Text>
                        <View style={[styles.numberText, {width: '25%'}]}><Text style={[styles.inputText]}>set x rep</Text></View>
                        <View style={[styles.numberText, {width: '20%'}]}><Text style={[styles.inputText]}>weight</Text></View>
                    </View>
                    {props.rows[props.id].map(row => <InputRow id={row.id} key={row.id} text={row.text} onRowText={props.onRowText}
                    cardID={props.id}/>)}
                </View>
                <CardButtons onCondense={props.onCondense} onAdd={props.onAdd} onDelete={props.onDelete} id={props.id}/>
            </View> :
            <View style={[styles.container]}>
                <View style={{flex: 0, flexShrink: 1, flexGrow: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Image style={[styles.image, styles.close]} source={require('../assets/icons/close_icon2.png')} 
                    onTouchEnd={() => props.onCondense({viewMode: false, cardNo: 0})}/>
                    <Text style={styles.cardText}>{props.title}</Text>
                    <Image style={[styles.image, styles.edit]} source={require('../assets/icons/not_editing_icon.jpeg')} 
                    onTouchEnd={() => toggleEdit(true)}/>
                </View>
                <View style={{flex: 0, alignItems: 'center'}}>
                    <View style={styles.rowTitle}>
                        <Text style={[styles.inputText, styles.workoutText]}>workout</Text>
                        <View style={[styles.numberText, {width: '25%'}]}><Text style={[styles.inputText]}>set x rep</Text></View>
                        <View style={[styles.numberText, {width: '20%'}]}><Text style={[styles.inputText]}>weight</Text></View>
                    </View>
                    {props.rows[props.id].map(row => <Row key={row.id} text={row.text}/>)}
                </View>
            </View>
            }
            </>
        );
    }
    }

const styles = EStyleSheet.create({
    container: {
        position: 'absolute',
        width: '98%',
        backgroundColor: colorTheme.lightTheme,
        top: '30%',
        borderRadius: '.2rem',
        alignSelf: 'center',
        zIndex: 1,
        flex: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: '.3rem'
    },
    rowTitle: {
        flex: 0,
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        marginTop: '.2rem',
        borderColor: colorTheme.mediumTheme
    },
    cardText: {
        fontFamily: 'Poppins_300Light',
        color: colorTheme.boldTheme,
        fontSize: '2rem',
        fontWeight: 'bold',
        marginTop: '.5rem',
        textAlign: 'center'
    }, 
    inputText: {
        fontFamily: 'Poppins_300Light',
        fontSize: '1rem',
        lineHeight: '2rem',
        color: colorTheme.boldTheme,
        marginLeft: '.2rem',
    },
    workoutText: {
        width: '55%'
    },
    numberText: {
        borderLeftWidth: 1,
        borderColor: colorTheme.mediumTheme
    },
    image: {
        aspectRatio: 1 / 1,
        marginLeft: '3%',
        marginRight: '3%'
    },
    close: {
        width: '8%'
    },
    edit: {
        width: '9%',
        borderRadius: '.5rem'
    }
});