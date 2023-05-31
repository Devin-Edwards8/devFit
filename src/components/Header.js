import { View, Image, Text } from 'react-native';
import React from 'react';
import { colorTheme } from '../global_colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Header(props) {
    return (
        <View style={styles.strip}>
            {props.screen === "settings" ? 
            <Image style={styles.image} source={require('../assets/icons/close_icon.png')} onTouchEnd={() => props.onClose(0)} /> :
            <Image style={styles.image} source={require('../assets/icons/settings_icon.png')} onTouchEnd={() => props.onSwitch(3)} />
            }
            {props.screen === "fitness" ? <View onTouchEnd={() => props.onAdd()}><Text style={styles.add}>+</Text></View> : <></>}
        </View>
    );
}

const styles = EStyleSheet.create({
    strip: {
        flex: 0,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        backgroundColor: colorTheme.bars
    },
    image: {
        width: '1.5rem',
        height: '1.5rem',
        marginLeft: '1rem',
        marginBottom: '.7rem'
    },
    add: {
        color: colorTheme.background,
        fontSize: '3rem',
        marginRight: '1rem'
    }
});