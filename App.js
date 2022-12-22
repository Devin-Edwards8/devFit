import react from 'react';
import { View } from 'react-native';
import StartScreen from './components/StartScreen';
import MainScreen from './components/MainScreen/MainScreen';
import FitnessScreen from './components/FitnessScreen/FitnessScreen';
import NutritionScreen from './components/NutritionScreen';
import IosFonts from './components/FontTest';

export default class App extends react.Component {
  switch = (screenNum) => {
    this.setState({
      currentScreen: screenNum
    })
  }

  handleAddCard = () => {
    const cards = [...this.state.cards];
    const cardNum = cards.length;
    let uniqueID;
    if(cardNum === 0) {
      uniqueID = 1
    } else {
      const ids = cards.map(e => e.id)
      uniqueID = Math.max.apply(null, ids) + 1
    }
    
    cards[cardNum] = {id: uniqueID, title: 'edit'}
    this.setState({
        cards: cards
    })
  }

  handleDeleteCard = (id) => {
    const cards = this.state.cards.filter(c => c.id !== id)
    this.setState({
        cards: cards
    })
  }

  handleAddRow = () => {
    const rows = [...this.state.rows];
    const cardNum = rows.length;
    rows[cardNum] = {id: cardNum, text: ['enter workout', '-', '-']}
    this.setState({
        rows: rows
    })
  }

  handleDeleteRow = () => {
    const rows = this.state.rows.filter(c => c.id !== this.state.rows.length - 1)
    this.setState({
        rows: rows
    })
  }

  handleTitle = (title, id) => {
    const cards = [...this.state.cards];
    cards.forEach(element => {
      if(element.id == id) {
        element.title = title
      }
    });
    this.setState({
      cards: cards
    })
  }

  handleRowText = (string, id, index) => {
    const rows = [...this.state.rows];
    rows.forEach(element => {
      if(element.id == id) {
        element.text[index] = string
      }
    });
    this.setState({
      rows: rows
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: [
        {id: 0, title: 'edit'}
      ],
      currentScreen: 0,
      rows: [
        {id: 0, text: ['enter workout', '-', '-']}
      ]
    }
  }

  render() {
    const screens = [
      <StartScreen onSwitch={this.switch}/>,
      <MainScreen onSwitch={this.switch}/>,
      <FitnessScreen onSwitch={this.switch} onDeleteCard={this.handleDeleteCard} rows={this.state.rows} onAddRow={this.handleAddRow}
      onAddCard={this.handleAddCard} cards={this.state.cards} onTitleChange={this.handleTitle} onDeleteRow={this.handleDeleteRow}
      onRowText={this.handleRowText}/>,
      <NutritionScreen onSwitch={this.switch}/>,
      <IosFonts></IosFonts>
    ]

    return (
      <>{screens[this.state.currentScreen]}</>
    );
  }
}
