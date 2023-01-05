import react from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import ProgressBar from './components/ProgressBar'
import BottomNavBar from './components/BottomNavBar'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import GoalSetting from './components/GoalSetting'

export default class FitnessScreen extends react.Component {
    constructor(props) {
        super(props)
        this.input1 = react.createRef();
        this.input2 = react.createRef();
    }

    state = {
        settingMode: false,
        currentCalorieValue: 0,
        currentProteinValue: 0,
    }

    handleGoalSet = () => {
        this.setState({
            settingMode: true
        })
    }

    handleGoalClose = () => {
        this.setState({
            settingMode: false
        })
    }

    handleManualSubmission = () => {
        this.props.onValueChange(this.state.currentCalorieValue, 1)
        this.props.onValueChange(this.state.currentProteinValue, 2)
        this.input1.current.clear()
        this.input2.current.clear()
        this.setState({
            ...this.state,
            currentCalorieValue: 0,
            currentProteinValue: 0
        })
    }

    handleSearchSubmission = (cals, prot) => {
        this.props.onValueChange(cals, 1)
        this.props.onValueChange(prot, 2)
    }

    render() {
        return (
            <View style={styles.container}>
                <Header /> 
                {this.state.settingMode ? 
                <GoalSetting onGoalClose={this.handleGoalClose} onGoalSet={this.props.onGoalSet} 
                progressBars={this.props.progressBars} onReset={this.props.onReset}/> : 
                <>
                <SearchBar onGoalSet={this.handleGoalSet} onSubmission={this.handleSearchSubmission}/>
                <Text style={styles.submissionTitle}>Manual Entries</Text>
                <View style={styles.manualSubmission}>
                    <TextInput style={styles.entryBox} placeholder='calories' placeholderTextColor='#e05780' ref={this.input1}
                    onChangeText={(load) => this.setState({...this.state, currentCalorieValue: load})}/>
                    <TextInput style={styles.entryBox} placeholder='protein' placeholderTextColor='#e05780' ref={this.input2}
                    onChangeText={(load) => this.setState({...this.state, currentProteinValue: load})}/>
                    <View style={styles.submissionButton} onTouchEnd={() => this.handleManualSubmission()}>
                        <Text>{"\u2713"}</Text>
                    </View>
                </View>
                <View style={styles.barBox}>
                    {this.props.progressBars.map(p => <ProgressBar title={p.title} value={p.value} key={p.id} goal={p.goal}/>)}
                </View>
                </>
                }
                <BottomNavBar onSwitch={this.props.onSwitch}/>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#220135',
    },
    manualSubmission: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    submissionTitle: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 20,
        alignSelf: 'center',
        color: '#ffc2d4',
        margin: 10
    }, 
    entryBox: {
        flex: 2,
        width: '40%',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        height: 30,
        backgroundColor: '#190028',
        fontFamily: 'Arial',
        color: '#ffc2d4',
        paddingLeft: 5
    },
    submissionButton: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 30,
        height: 30,
        backgroundColor: '#ffc2d4'
    },
    barBox: {
        flex: 0,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-evenly'
    }
});