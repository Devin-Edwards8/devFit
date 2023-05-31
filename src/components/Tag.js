import { View} from 'react-native';
import { colorTheme } from '../global_colors';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Tag(props) {
    const tagStyles = [styles.hollow, styles.red, styles.yellow, styles.green]
    let tagStyle
    if(0 <= props.num < 4) {
        tagStyle = tagStyles[props.num]
    } else { 
        tagStyle = styles.hollow
    }

    return (
        <>
        {props.editMode ?
        <View style={[styles.editTag, styles.edit, tagStyle]} onTouchEnd={() => props.onTagClick(props.id, props.cardID)}></View> :
        <View style={[styles.tag, styles.static, tagStyle]}></View>}
        </>
    );
}

const styles = EStyleSheet.create({
    tag: {
        position: 'absolute',
        right: '45%',
        top: '.3rem',
        marginRight: '.2rem',
        width: '1.4rem',
        aspectRatio: 1 / 1,
        borderRadius: '.7rem',
        zIndex: 1
    },
    editTag: {
        marginTop: '.3rem',
        marginRight: '.2rem',
        width: '1.4rem',
        aspectRatio: 1 / 1,
        borderRadius: '.7rem',
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
        backgroundColor: '#ff0000',
        borderColor: '#ff0000'
    },
    yellow: {
        backgroundColor: '#ffd60a',
        borderColor: '#ffd60a'
    }, 
    green: {
        backgroundColor: '#06d6a0',
        borderColor: '#06d6a0'
    }
});
