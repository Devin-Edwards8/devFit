import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { colorTheme } from '../global_colors';

export default function Header(props) {
    return (
        <View style={styles.strip}>
            <Image style={styles.image} source={require('../assets/icons/settings_icon.png')} />
            {props.screen === "fitness" ? <Text style={styles.add}>+</Text> : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    strip: {
        flex: 0,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: colorTheme.bars
    },
    image: {
        height: 23,
        width: 23,
        marginLeft: 20,
        marginBottom: 10
    },
    add: {
        color: colorTheme.background,
        fontSize: 40,
        marginRight: 20
    }
});