import { TextInput, View, Image } from 'react-native';
import React, { useState } from 'react';
import { colorTheme } from '../global_colors';
import EStyleSheet from 'react-native-extended-stylesheet'

export default function SearchBar(props) {
    const searchRef = React.createRef()
    const [searchText, changeText] = useState('')
    const submitSearch = () => {
        searchRef.current.clear()
        props.handleSearch(searchText)
    }
    
    return (
        <View style={styles.header}>
            <View style={styles.searchBar}>
                <Image style={styles.image} source={require('../assets/icons/search_icon.png')} />
                <TextInput style={styles.searchText} placeholder='search nutrition database' 
                placeholderTextColor={colorTheme.mediumTheme} 
                onSubmitEditing={() => submitSearch()} ref={searchRef} 
                onChangeText={(load) => changeText(load)} autoCapitalize='none'/>
            </View>
        </View>
    );
}

const styles = EStyleSheet.create({
    header: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: colorTheme.bars,
        height: 40,
        width: '100%',
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: colorTheme.background,
        marginLeft: '.5rem',
        width: '95%',
        padding: '.3rem',
        borderRadius: 5
    },
    searchText: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: colorTheme.boldAccent,
        width: 310, 
        marginLeft: 5
    },
    image: {
        height: 20,
        width: 20
    }
});