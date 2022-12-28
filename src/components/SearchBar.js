import { StyleSheet, TextInput, View, Image} from 'react-native';
import React from 'react';

export default function SearchBar(props) {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Image style={styles.image} source={require('../assets/icons/search_icon.png')} />
                <TextInput style={styles.searchText} placeholder='search nutrition' placeholderTextColor='#ffc2d4' />
            </View>
            <View style={styles.settings}>
                <View style={styles.line}/>
                <View style={styles.line}/>
                <View style={styles.line}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#190028',
        height: 40,
        width: '100%',
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
        width: 330,
        backgroundColor: '#220135',
        padding: 5,
        marginLeft: 10,
        borderRadius: 5
    },
    searchText: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#ffc2d4',
        width: 310, 
        marginLeft: 5
    }, 
    image: {
        height: 20,
        width: 20
    }, 
    settings: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 30,
    }, 
    line: {
        width: 30,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#ffc2d4',
        margin: 3
    }
});