import { StyleSheet, TextInput, View, Image, Text, ScrollView} from 'react-native';
import React, {Component} from 'react';
import SearchResults from './SearchResults';
import { colorTheme } from '../global_colors';

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.searchBar = React.createRef();
    }

    state = {
        searched: false,
        successfulQuery: true,
        currentText: '',
        results: []
    };
    
    handleSearch = () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '019329eaffmsh9c1997011fad833p1447b9jsn04995410a57e',
                'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
            }
        };
        this.setState({
            ...this.state,
            successfulQuery: true
        })
        fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cooking&category%5B0%5D=generic-foods&health%5B0%5D=' + this.state.currentText, options)
            .then(response => response.json())
            .then(results => {
                results = results["hints"]
                // console.log(results)
                this.setState({
                    ...this.state,
                    results: results,
                    searched: true
                })
            })
            .catch(() => this.setState({...this.state, successfulQuery: false}));
        this.searchBar.current.clear()
    }
    
    render() {
        const container = this.props.isTyping ? 0 : 1;
        return (
                <View style={styles.header}>
                    <View style={styles.searchBar}>
                        <Image style={styles.image} source={require('../assets/icons/search_icon.png')} />
                        <TextInput style={styles.searchText} placeholder='search nutrition' placeholderTextColor={colorTheme.mediumTheme} 
                        onSubmitEditing={() => this.handleSearch()} ref={this.searchBar} 
                        onChangeText={load => this.setState({...this.state, currentText: load})}/>
                    </View>
                    {/* {this.props.isTyping ? 
                <View style={{height: 0}}></View> :
                <>
                    {this.state.searched ? 
                    <View style={styles.searchSpace}>
                        {this.state.successfulQuery ? 
                        <ScrollView style={styles.responseSpace}>
                            <Text style={styles.resultHeader}>Top Results:</Text>
                            {this.state.results.map((r, i) => <SearchResults key={i} currentItem={r["food"]["label"]} 
                            itemCals={r["food"]["nutrients"]["ENERC_KCAL"]} itemProt={r["food"]["nutrients"]["PROCNT"]}
                            onSubmission={this.props.onSubmission}/>)}
                        </ScrollView> :
                        <Text style={styles.resultText}>No Item Found.</Text>
                        }
                    </View> :
                    <></>
                    }
                </>
                } should be beneath this view*/}
                </View>
        );
    }
}

const styles = StyleSheet.create({
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
        borderWidth: 1,
        borderColor: colorTheme.lightAccent,
        padding: 5,
        marginLeft: 10,
        borderRadius: 5
    },
    searchText: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: colorTheme.boldAccent,
        width: 310, 
        marginLeft: 5
    }, 
    resultHeader: {
        fontSize: 30,
        fontFamily: 'Arial Rounded MT Bold',
        color: colorTheme.boldAccent,
        marginBottom: 5,
        alignSelf: 'center'
    }, 
    image: {
        height: 20,
        width: 20
    },
    searchSpace: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '95%',
        borderRadius: 10,
        backgroundColor: colorTheme.offBackground
    },
    dots: {
        fontSize: 40,
        fontFamily: 'Arial Rounded MT Bold',
        color: colorTheme.highContrast
    }
});