import react from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { colorTheme } from '../global_colors';

export default class BottomNavBar extends react.Component {
    render() {
        return (
            <View style={styles.navbar}>
                <View onTouchEnd={() => this.props.onSwitch(2)} style={styles.button}>
                    <Image style={styles.image} source={require('../assets/icons/new_nutrition_icon.png')} />
                </View>
                <View onTouchEnd={() => this.props.onSwitch(0)} style={styles.button}>
                    <Image style={styles.image} source={require('../assets/icons/new_home_icon.png')} />
                </View>
                <View onTouchEnd={() => this.props.onSwitch(1)} style={styles.button}>
                    <Image style={styles.image} source={require('../assets/icons/new_fitness_icon.png')} />
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    navbar: {
        flex: 0,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        backgroundColor: colorTheme.bars
    },
    button: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '33.3%'
    },
    image: {
        height: 40,
        width: 40
    }
});