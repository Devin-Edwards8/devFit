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
        let paddingBottom = editMode ? 0 : styles.$lightPad
        return (
            <View style={[styles.container, {paddingBottom: paddingBottom}]}>
                <View style={styles.titleContainer}>
                    <Image style={[styles.image, styles.close]} source={require('../assets/icons/close_icon2.png')} 
                    onTouchEnd={() => props.onCondense({viewMode: false, cardNo: 0})} onClick={() => props.onCondense({viewMode: false, cardNo: 0})}/>
                    {editMode ? <TextInput style={styles.cardText} value={props.title} /> :
                    <Text style={styles.cardText}>{props.title}</Text>}
                    {editMode ? 
                    <Image style={[styles.image, styles.edit]} source={require('../assets/icons/editing_icon.jpeg')} 
                    onTouchEnd={() => toggleEdit(false)} onClick={() => toggleEdit(false)}/> :
                    <Image style={[styles.image, styles.edit]} source={require('../assets/icons/not_editing_icon.jpeg')} 
                    onTouchEnd={() => toggleEdit(true)} onClick={() => toggleEdit(true)}/> }
                </View>
                <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
                    <View style={styles.rowTitle}>
                        <Text style={[styles.inputText, styles.workoutText]}>workout</Text>
                        <View style={[styles.numberText, {width: '25%'}]}><Text style={[styles.inputText]}>set x rep</Text></View>
                        <View style={[styles.numberText, {width: '20%'}]}><Text style={[styles.inputText]}>weight</Text></View>
                    </View>
                    {editMode ? 
                    props.rows[props.id].map(row => <InputRow id={row.id} key={row.id} text={row.text} onRowText={props.onRowText}
                    cardID={props.id} tagNo={row.tagNo} onTagClick={props.onTagClick}/>) :
                    props.rows[props.id].map(row => <Row id={row.id} key={row.id} text={row.text} onRowText={props.onRowText}
                    cardID={props.id} tagNo={row.tagNo}/>)}
                </View>
                {editMode ? <CardButtons onCondense={props.onCondense} onAdd={props.onAdd} onDelete={props.onDelete} id={props.id}/> : <></>}
            </View>
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
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowTitle: {
        flex: 1,
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
        maxWidth: '2rem'
    },
    close: {
        width: '8%',
        marginLeft: '.3rem'
    },
    edit: {
        width: '9%',
        borderRadius: '.5rem',
        marginRight: '.3rem'
    },
    $lightPad: '.3rem'
});