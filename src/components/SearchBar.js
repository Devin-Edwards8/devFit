import { StyleSheet, TextInput, View, Image, Text, ScrollView} from 'react-native';
import React, {Component} from 'react';
import SearchResults from './SearchResults';

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
        fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=' + this.state.currentText, options)
            .then(response => response.json())
            .then(results => {
                results = results["hints"]
                console.log(results)
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
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.searchBar}>
                        <Image style={styles.image} source={require('../assets/icons/search_icon.png')} />
                        <TextInput style={styles.searchText} placeholder='search nutrition' placeholderTextColor='#ffc2d4' 
                        onSubmitEditing={() => this.handleSearch()} ref={this.searchBar} 
                        onChangeText={load => this.setState({...this.state, currentText: load})}/>
                    </View>
                    <View style={styles.settings} onTouchEnd={() => this.props.onGoalSet()}>
                        <View style={styles.line}/>
                        <View style={styles.line}/>
                        <View style={styles.line}/>
                    </View>
                </View>
                {this.state.searched ? 
                <View style={styles.searchSpace}>
                    {this.state.successfulQuery ? 
                    <ScrollView style={styles.responseSpace}>
                        <Text style={styles.resultHeader}>Top Results:</Text>
                        {this.state.results.map(r => <SearchResults currentItem={r["food"]["label"]} 
                        itemCals={r["food"]["nutrients"]["ENERC_KCAL"]} itemProt={r["food"]["nutrients"]["PROCNT"]}
                        onSubmission={this.props.onSubmission}/>)}
                    </ScrollView> :
                    <Text style={styles.resultText}>No Item Found.</Text>
                    }
                </View> :
                <View style={styles.searchSpace}>
                    <Image style={styles.slothImage} source={require('../assets/sloth.png')}/>
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
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
    resultHeader: {
        fontSize: 30,
        fontFamily: 'Arial',
        color: '#ffc2d4',
        marginBottom: 5,
        alignSelf: 'center'
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
        backgroundColor: '#e05780',
        margin: 3
    }, 
    searchSpace: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '95%',
        borderRadius: 10,
        backgroundColor: '#190028'
    }, 
    slothImage: {
        width: 200,
        height: 200
    }
});