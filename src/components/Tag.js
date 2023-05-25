import { View} from 'react-native';
import { colorTheme } from '../global_colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Tag(props) {
    const tagStyles = [styles.hollow, styles.red, styles.yellow, styles.green]
    let tagStyle = tagStyles[props.num]
    return (
        <>
        {props.editMode ?
        <View style={[styles.tag, styles.edit, tagStyle]} onTouchEnd={() => props.incrementCount}></View> :
        <View style={[styles.tag, styles.static, tagStyle]}></View>
        }
        </>
    );
}

const styles = EStyleSheet.create({
    tag: {
        position: 'absolute',
        right: '46%',
        top: '.3rem',
        width: '1.4rem',
        aspectRatio: 1 / 1,
        borderRadius: '.7rem',
        zIndex: 1
    },
    edit: {
        opacity: .7,
        borderWidth: 1
    },
    static: {
        opacity: .3,
        borderWidth: 0
    },
    hollow: {
        borderStyle: 'dashed',
        borderColor: colorTheme.boldTheme
    },
    red: {
        backgroundColor: '#ff0000'
    },
    yellow: {
        backgroundColor: '#ffd60a'
    }, 
    green: {
        backgroundColor: '#06d6a0'
    }
});
