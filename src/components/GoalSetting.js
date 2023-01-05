import { StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function ProgressBar(props) {
    const [buttonColor, setButtonColor] = useState('#ec0868')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nutrition Goals</Text>
                <View style={styles.closeButton} onTouchEnd={props.onGoalClose}>
                    <Image style={styles.image} source={require('../assets/icons/exit_icon.png')}/>
                </View>
            </View>
            <View style={styles.goalInput}>
                <Text style={styles.goalPrompt}>Calories per day: </Text>
                <View style={styles.inputSpace}>
                    <TextInput style={styles.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[0].id)}>
                        {props.progressBars[0].goal}</TextInput>
                </View>
            </View>
            <View style={styles.goalInput}>
                <Text style={styles.goalPrompt}>Grams of protein per day: </Text>
                <View style={styles.inputSpace}>
                    <TextInput style={styles.inputText} onChangeText={(load) => props.onGoalSet(load, props.progressBars[1].id)}>
                        {props.progressBars[1].goal}</TextInput>
                </View>
            </View>
            <View style={[styles.resetButton, {backgroundColor: buttonColor}]} onTouchEnd={() => props.onReset()}
            onTouchStart={() => setButtonColor('#ffc2d4')}>
                <Text style={styles.resetText}>Reset Values</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        alignItems: 'center'
    }, 
    title: {
        fontSize: 40,
        fontFamily: 'Arial Rounded MT Bold',
        color: '#ffc2d4',
        marginLeft: 10
    },
    closeButton: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#190028',
        borderRadius: 10
    },
    header: {
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    image: {
        height: 20,
        width: 20
    }, 
    goalInput: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        alignContent: 'center',
        marginTop: 20
    }, 
    goalPrompt: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 20,
        color: '#ffc2d4',
        marginLeft: 20
    },
    inputSpace: {
        backgroundColor: '#190028',
        height: 28,
        minWidth: 20,
        width: 'auto',
        borderRadius: 3,
        alignContent: 'center'
    },
    inputText: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 18,
        color: '#e05780',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 5,
        paddingRight: 5
    },
    resetButton: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80, 
        width: 180,
        borderRadius: 20,
        marginTop: 80
    },
    resetText: {
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: 20,
        color: '#190028'
    }
});