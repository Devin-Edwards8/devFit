import react from 'react';
import { View } from 'react-native';
import StartScreen from './src/StartScreen';
import MainScreen from './src/MainScreen';
import FitnessScreen from './src/FitnessScreen';
import NutritionScreen from './src/NutritionScreen';
import IosFonts from './src/FontTest';

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
    rows[cardNum] = {id: cardNum, text: ['', '', '']}
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
        {id: 0, text: ['', '', '']}
      ],
      bubbles: [
        {title: 'calories', value: 0, id: 1, goal: 0},
        {title: 'protein', value: 0, id: 2, goal: 0},
      ]
    }
  }

  render() {
    const screens = [
      <MainScreen onSwitch={this.switch}/>,
      <FitnessScreen onSwitch={this.switch} onDeleteCard={this.handleDeleteCard} rows={this.state.rows} onAddRow={this.handleAddRow}
      onAddCard={this.handleAddCard} cards={this.state.cards} onTitleChange={this.handleTitle} onDeleteRow={this.handleDeleteRow}
      onRowText={this.handleRowText}/>,
      <NutritionScreen onSwitch={this.switch} bubbles={this.state.bubbles}/>,
      <IosFonts></IosFonts>
    ]

    return (
      <>{screens[this.state.currentScreen]}</>
    );
  }
}
