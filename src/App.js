import { useState, useEffect } from 'react';
import MainScreen from './containers/MainScreen';
import FitnessScreen from './containers/FitnessScreen';
import NutritionScreen from './containers/NutritionScreen';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingsScreen from './containers/Settings';
 
EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});


export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [cards, setCards] = useState([{id: 0, title: 'edit'}])
  const { setItem, getItem } = useAsyncStorage('@cards')
  const [rows, setRows] = useState({0: [{id: 0, text: ['', '', '']}]})
  const [progressBars, setProgressBars] = useState([{title: 'calories', value: 0, id: 1, goal: 0},
  {title: 'protein', value: 0, id: 2, goal: 0}])

  const switchScreen = (screenNum) => {
    setCurrentScreen(screenNum)
  }

  useEffect(() => {
    loadWorkouts().catch(e => console.error(e));
    loadProgress().catch(e => console.error(e));
    loadRows().catch(e => console.error(e));
  }, []);

  const handleAddCard = () => {
    const tempCards = [...cards]
    const cardNum = tempCards.length;
    let uniqueID;
    if(cardNum === 0) {
      uniqueID = 1
    } else {
      const ids = tempCards.map(e => e.id)
      uniqueID = Math.max.apply(null, ids) + 1
    }
    tempCards[cardNum] = {id: uniqueID, title: 'edit'}
    const tempRows = {...rows}
    tempRows[uniqueID] = [{ id: 0, text: ['','',''] }, ]
    saveRows(tempRows)
    saveWorkouts(tempCards)
  }

  const handleDeleteCard = (id) => {
    const newCards = cards.filter(c => c.id !== id)
    delete rows.id
    saveRows(rows)
    saveWorkouts(newCards)
  }

  const handleAddRow = (cardID) => {
    const tempRows = {...rows}
    const cardNum = tempRows[cardID].length;
    tempRows[cardID][cardNum] = {id: cardNum, text: ['', '', '']}
    saveRows(tempRows)
  }

  const handleDeleteRow = (cardID) => {
    const tempRows = {...rows}
    tempRows[cardID] = tempRows[cardID].filter(c => c.id !== tempRows[cardID].length - 1)
    saveRows(tempRows)
  }

  const handleTitle = (title, id) => {
    const newCards = [...cards]
    newCards.forEach(element => {
      if(element.id === id) {
        element.title = title
      }
    });
    saveWorkouts(newCards)
  }

  const handleRowText = (string, id, index, cardID) => {
    const tempRows = {...rows}
    tempRows[cardID].forEach(element => {
      if(element.id === id) {
        element.text[index] = string
      }
    });
    saveRows(tempRows)
  }

  const handleGoal = (goal, id) => {
    const tempProgressBars = [...progressBars]
    tempProgressBars.forEach(element => {
      if(element.id === id) {
        element.goal = goal
      }
    });
    saveProgress(tempProgressBars)
  }

  const handleValueChange = (val, id) => {
    const tempProgressBars = [...progressBars]
    tempProgressBars.forEach(element => {
      if(element.id === id) {
        element.value += Number(val)
      }
    });
    saveProgress(tempProgressBars)
  }

  const handleValueReset = () => {
    const tempProgressBars = [...progressBars]
    tempProgressBars.forEach(element => {
      element.value = 0
    });
    saveProgress(tempProgressBars)
  }

  const screens = [
    <MainScreen onSwitch={switchScreen}/>,
    <FitnessScreen onSwitch={switchScreen} onDeleteCard={handleDeleteCard} rows={rows} onAddRow={handleAddRow}
    onAddCard={handleAddCard} cards={cards} onTitleChange={handleTitle} onDeleteRow={handleDeleteRow}
    onRowText={handleRowText}/>,
    <NutritionScreen onSwitch={switchScreen} onGoalSet={handleGoal} progressBars={progressBars}
    onValueChange={handleValueChange} onReset={handleValueReset}/>,
    <SettingsScreen onSwitch={switchScreen} onGoalSet={handleGoal} onReset={handleValueReset} progressBars={progressBars} />
  ]

  return (
    <>{screens[currentScreen]}</>
  );

  async function saveProgress(value) {
    await AsyncStorage.setItem('@progressBars', JSON.stringify(value))
    setProgressBars(value)
  }

  async function loadProgress() {
    const oldBars = await AsyncStorage.getItem('@progressBars').catch(e => console.error(e))
    if(oldBars !== null) {
      setProgressBars(JSON.parse(oldBars))
    } else {
      setProgressBars(progressBars)
    }
  }

  async function saveRows(value) {
    await AsyncStorage.setItem('@rows', JSON.stringify(value))
    setRows(value)
  }

  async function loadRows() {
    const oldRows = await AsyncStorage.getItem('@rows').catch(e => console.error(e))
    if(oldRows !== null) {
      setRows(JSON.parse(oldRows))
    } else {
      setRows(rows)
    }
  }

  async function saveWorkouts(newCards) {
    await setItem(JSON.stringify(newCards)).catch(e => console.error(e))
    setCards(newCards)
  }

  async function loadWorkouts() {
    const oldCards = await getItem().catch(e => console.error(e))
    if(oldCards !== null) {
      setCards(JSON.parse(oldCards))
    } else {
      setCards(cards)
    }
  }
}
