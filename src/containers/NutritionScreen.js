import react from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard } from 'react-native'
import ProgressBar from '../components/ProgressBar'
import BottomNavBar from '../components/BottomNavBar'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import GoalSetting from '../components/GoalSetting'
import { colorTheme } from '../global_colors'
import PieChart from 'react-native-pie-chart'

export default class FitnessScreen extends react.Component {
    constructor(props) {
        super(props)
        this.input1 = react.createRef();
        this.input2 = react.createRef();
    }

    state = {
        settingMode: false,
        manualEntry: false,
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
        Keyboard.dismiss()
        this.setState({
            ...this.state,
            currentCalorieValue: 0,
            currentProteinValue: 0,
            manualEntry: false
        })
    }

    handleSearchSubmission = (cals, prot) => {
        this.props.onValueChange(cals, 1)
        this.props.onValueChange(prot, 2)
    }

    p0 = this.props.progressBars[0]
    p1 = this.props.progressBars[1]

    render() {
        return (
            <View style={styles.container}>
                <Header /> 
                {this.state.settingMode ? 
                <GoalSetting onGoalClose={this.handleGoalClose} onGoalSet={this.props.onGoalSet} 
                progressBars={this.props.progressBars} onReset={this.props.onReset}/> : 
                <View style={styles.nutritionContainer}>
                    <SearchBar onGoalSet={this.handleGoalSet} onSubmission={this.handleSearchSubmission} isTyping={this.state.manualEntry}/>
                    <Text style={styles.title}>Nutrition Tracker</Text>
                    <View style={styles.chartBox}>
                        <View style={styles.calorieChart}>
                            <PieChart widthAndHeight={200} series={[this.p1.value / this.p1.goal, 1]} 
                            sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]} key={this.p0.id}/>
                        </View>
                        <View style={styles.proteinChart}>
                            <PieChart widthAndHeight={200} series={[this.p1.value / this.p1.goal, 1]} 
                            sliceColor={[colorTheme.mediumTheme, colorTheme.boldTheme]} key={this.p1.id}/>
                        </View>
                    </View>
                    <Text style={styles.submissionTitle}>Add as you eat!</Text>
                    <View style={styles.manualSubmission}>
                        <TextInput style={styles.entryBox} placeholder='calories' placeholderTextColor={colorTheme.mediumTheme} ref={this.input1}
                        onChangeText={(load) => this.setState({...this.state, currentCalorieValue: load})}
                        onPressIn={() => this.setState({manualEntry: true})} onSubmitEditing={() => this.setState({manualEntry: false})}/>
                        <TextInput style={styles.entryBox} placeholder='protein' placeholderTextColor={colorTheme.mediumTheme} ref={this.input2}
                        onChangeText={(load) => this.setState({...this.state, currentProteinValue: load})}
                        onPressIn={() => this.setState({manualEntry: true})} onSubmitEditing={() => this.setState({manualEntry: false})}/>
                        <View style={styles.submissionButton} onTouchEnd={() => this.handleManualSubmission()}>
                            <Text style={{color: colorTheme.background}}>{"\u2713"}</Text>
                        </View>
                    </View>
                </View>
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
        backgroundColor: colorTheme.background,
    },
    title: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 30,
        color: colorTheme.accent,
        alignSelf: 'center',
        margin: 20
    },
    chartBox: {
        flex: 0,
        flexDirection: 'column',
        width: '100%',
    },
    calorieChart: {

    },
    proteinChart: {

    },
    submissionTitle: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 13,
        color: colorTheme.boldAccent,
        margin: 5
    }, 
    manualSubmission: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: colorTheme.lightTheme,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    entryBox: {
        flex: 2,
        width: '40%',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        height: 30,
        backgroundColor: colorTheme.background,
        borderWidth: 1,
        borderColor: colorTheme.boldAccent,
        fontFamily: 'Arial',
        color: colorTheme.boldAccent,
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
        backgroundColor: colorTheme.mediumTheme
    }
});