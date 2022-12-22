import react from 'react'
import { StyleSheet, View, Text } from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ExpandedCard from './ExpandedCard';

export default class Card extends react.Component {
    state = {
        delete: false,
        viewMode: false,
    }

    handleSwipeLeft = (gestureState) => {
        this.setState({
            ...this.state,
            delete: true
        })
    }

    handleSwipeRight = (gestureState) => {
        this.setState({
            ...this.state,
            delete: false
        })
    }

    handleExpand = () => {
        this.setState({
            ...this.state,
            viewMode: true
        })
    }

    handleCondense = () => {
        this.setState({
            ...this.state,
            viewMode: false
        })
    }

    render() {
        return (
            <>
            {this.state.viewMode ? 
            <View style={styles.expandedCard}>
                <ExpandedCard onCondense={this.handleCondense} title={this.props.title} onTitleChange={this.props.onTitleChange}
                    id={this.props.id} rows={this.props.rows} onAdd={this.props.onAdd} onDelete={this.props.onDeleteRow}
                    onRowText={this.props.onRowText}/>
            </View> :
            <GestureRecognizer style={styles.card} onSwipeLeft={(state) => this.handleSwipeLeft(state)}
            onSwipeRight={(state) => this.handleSwipeRight()}>
                <View></View>
                <Text onTouchEnd={this.handleExpand} style={styles.cardText}>{this.props.title}</Text>
                {this.state.delete ? <View style={styles.deleteButton} onTouchEnd={() => this.props.onDelete(this.props.id)}>
                    <Text style={styles.deleteText}>Delete</Text></View> : <View></View>}
            </GestureRecognizer>}
            </>
        );
    }
}
 
const styles = StyleSheet.create({
    card: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ffe0e9'
    },
    cardText: {
        fontFamily: 'Arial Rounded MT Bold',
        color: '#e05780',
        fontSize: 30,
        fontWeight: 'bold',
    }, 
    expandedCard: {
        flex: 0,
        alignItems: 'center',
        width: '100%',
        minHeight: '10%',
        borderBottomWidth: 1,
        borderColor: '#ffe0e9'
    },
    deleteButton: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffc2d4',
        height: '100%',
        width: 100,
    }, 
    deleteText: {
        color: '#220135',
        fontFamily: 'Arial Rounded MT Bold',
    }
});