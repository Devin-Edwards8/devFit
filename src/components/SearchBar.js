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
        <View style={styles.background}>
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
    background: {
        backgroundColor: colorTheme.bars,
        height: '2.5rem',
        width: '100%',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colorTheme.background,
        marginLeft: '1%',
        marginTop: '.25rem',
        marginBottom: '.25rem',
        width: '98%',
        height: '2rem',
        padding: '.3rem',
        borderRadius: '.5rem'
    },
    searchText: {
        fontSize: '1.4rem',
        fontFamily: 'Arial',
        color: colorTheme.boldAccent,
        marginLeft: '.2rem',
        flex: 1
    },
    image: {
        width: '1.8rem',
        aspectRatio: 1 / 1,
        alignSelf: 'center'
    }
});