import { StyleSheet, View} from 'react-native';
import React from 'react';
import Title from './Title'

export default function Header(props) {
    return (
        <View style={styles.strip}>
            <Title />
        </View>
    );
}

const styles = StyleSheet.create({
    strip: {
        flex: 0,
        alignItems: 'center',
        width: '100%',
        height: 100,
        backgroundColor: '#190028'
    }
});